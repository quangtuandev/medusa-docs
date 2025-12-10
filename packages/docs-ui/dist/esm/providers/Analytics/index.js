"use client";
import React, { createContext, useCallback, useContext, useEffect, useState, } from "react";
import { useSegmentAnalytics } from "./providers/segment";
import { usePostHogAnalytics } from "./providers/posthog";
import { useReoDevAnalytics } from "./providers/reo-dev";
import { usePathname } from "next/navigation";
const AnalyticsContext = createContext(null);
const DEFAULT_TRACKER = "posthog";
export const AnalyticsProvider = ({ segmentWriteKey, reoDevKey, children, }) => {
    const [eventsQueue, setEventsQueue] = useState([]);
    const { track: trackWithSegment } = useSegmentAnalytics({
        segmentWriteKey,
        setEventsQueue,
    });
    const { track: trackWithPostHog } = usePostHogAnalytics();
    useReoDevAnalytics({ reoDevKey });
    const pathname = usePathname();
    const processEvent = useCallback(async (event) => {
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
    useEffect(() => {
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
    return (React.createElement(AnalyticsContext.Provider, { value: {
            track,
        } }, children));
};
export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error("useAnalytics must be used within a AnalyticsProvider");
    }
    return context;
};
