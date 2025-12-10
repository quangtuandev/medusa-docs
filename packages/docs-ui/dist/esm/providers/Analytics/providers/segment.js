import { AnalyticsBrowser } from "@segment/analytics-next";
import { useCallback, useEffect, useState } from "react";
const LOCAL_STORAGE_KEY = "ajs_anonymous_id";
export const useSegmentAnalytics = ({ segmentWriteKey, setEventsQueue, }) => {
    // loaded is used to ensure that a connection has been made to segment
    // even if it failed. This is to ensure that the connection isn't
    // continuously retried
    const [loaded, setLoaded] = useState(false);
    const [segmentAnalytics, setAnalytics] = useState(null);
    const segmentAnalyticsBrowser = new AnalyticsBrowser();
    const initSegment = useCallback(() => {
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
    const track = useCallback(async ({ event, options }) => {
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
    useEffect(() => {
        initSegment();
    }, [initSegment]);
    return {
        loaded,
        track,
    };
};
