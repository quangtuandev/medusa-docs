"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSegmentAnalytics = void 0;
const analytics_next_1 = require("@segment/analytics-next");
const react_1 = require("react");
const LOCAL_STORAGE_KEY = "ajs_anonymous_id";
const useSegmentAnalytics = ({ segmentWriteKey, setEventsQueue, }) => {
    // loaded is used to ensure that a connection has been made to segment
    // even if it failed. This is to ensure that the connection isn't
    // continuously retried
    const [loaded, setLoaded] = (0, react_1.useState)(false);
    const [segmentAnalytics, setAnalytics] = (0, react_1.useState)(null);
    const segmentAnalyticsBrowser = new analytics_next_1.AnalyticsBrowser();
    const initSegment = (0, react_1.useCallback)(() => {
        if (!segmentWriteKey || !loaded) {
            return;
        }
        segmentAnalyticsBrowser
            .load({ writeKey: segmentWriteKey }, {
            initialPageview: true,
            user: {
                localStorage: {
                    key: LOCAL_STORAGE_KEY,
                },
            },
        })
            .then((instance) => {
            setAnalytics(instance[0]);
        })
            .catch((e) => console.error(`Could not connect to Segment. Error: ${e}`))
            .finally(() => setLoaded(true));
    }, [loaded, segmentWriteKey]);
    const track = (0, react_1.useCallback)(async ({ event, options }) => {
        if (!loaded) {
            return;
        }
        if (segmentAnalytics) {
            void segmentAnalytics.track(event, {
                ...options,
                uuid: segmentAnalytics.user().anonymousId(),
            });
        }
        else {
            // push the event into the queue
            setEventsQueue((prevQueue) => [
                ...prevQueue,
                {
                    event,
                    options,
                    tracker: "segment",
                },
            ]);
            console.warn("Segment is either not installed or not configured. Simulating success...");
        }
    }, [segmentAnalytics, loaded]);
    (0, react_1.useEffect)(() => {
        initSegment();
    }, [initSegment]);
    return {
        loaded,
        track,
    };
};
exports.useSegmentAnalytics = useSegmentAnalytics;
