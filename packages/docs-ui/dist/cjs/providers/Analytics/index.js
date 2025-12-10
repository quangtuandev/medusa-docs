"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAnalytics = exports.AnalyticsProvider = void 0;
const react_1 = __importStar(require("react"));
const segment_1 = require("./providers/segment");
const posthog_1 = require("./providers/posthog");
const reo_dev_1 = require("./providers/reo-dev");
const navigation_1 = require("next/navigation");
const AnalyticsContext = (0, react_1.createContext)(null);
const DEFAULT_TRACKER = "posthog";
const AnalyticsProvider = ({ segmentWriteKey, reoDevKey, children, }) => {
    const [eventsQueue, setEventsQueue] = (0, react_1.useState)([]);
    const { track: trackWithSegment } = (0, segment_1.useSegmentAnalytics)({
        segmentWriteKey,
        setEventsQueue,
    });
    const { track: trackWithPostHog } = (0, posthog_1.usePostHogAnalytics)();
    (0, reo_dev_1.useReoDevAnalytics)({ reoDevKey });
    const pathname = (0, navigation_1.usePathname)();
    const processEvent = (0, react_1.useCallback)(async (event) => {
        const trackers = !event.tracker
            ? [DEFAULT_TRACKER]
            : Array.isArray(event.tracker)
                ? event.tracker
                : [event.tracker];
        event.options = {
            url: pathname,
            label: document.title,
            os: window.navigator.userAgent,
            ...event.options,
        };
        await Promise.all(trackers.map(async (tracker) => {
            switch (tracker) {
                case "posthog":
                    return trackWithPostHog(event);
                case "segment":
                default:
                    return trackWithSegment(event);
            }
        }));
    }, [trackWithSegment, trackWithPostHog, pathname]);
    const track = ({ event }) => {
        // Always queue events - this makes tracking non-blocking
        setEventsQueue((prevQueue) => [...prevQueue, event]);
        // Process event callback immediately
        // This ensures that the callback is called even if the event is queued
        event.callback?.();
    };
    (0, react_1.useEffect)(() => {
        if (eventsQueue.length) {
            // Process queue in background without blocking
            const currentQueue = [...eventsQueue];
            setEventsQueue([]);
            // Process events asynchronously in batches to avoid overwhelming the system
            const batchSize = 5;
            for (let i = 0; i < currentQueue.length; i += batchSize) {
                const batch = currentQueue.slice(i, i + batchSize);
                setTimeout(() => {
                    batch.forEach(processEvent);
                }, i * 10); // Small delay between batches
            }
        }
    }, [eventsQueue, processEvent]);
    return (react_1.default.createElement(AnalyticsContext.Provider, { value: {
            track,
        } }, children));
};
exports.AnalyticsProvider = AnalyticsProvider;
const useAnalytics = () => {
    const context = (0, react_1.useContext)(AnalyticsContext);
    if (!context) {
        throw new Error("useAnalytics must be used within a AnalyticsProvider");
    }
    return context;
};
exports.useAnalytics = useAnalytics;
