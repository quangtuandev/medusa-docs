/// <reference types="react" />
import { TrackedEvent } from "..";
type UseSegmentAnalyticsProps = {
    segmentWriteKey: string | undefined;
    setEventsQueue: React.Dispatch<React.SetStateAction<TrackedEvent[]>>;
};
export declare const useSegmentAnalytics: ({ segmentWriteKey, setEventsQueue, }: UseSegmentAnalyticsProps) => {
    loaded: boolean;
    track: ({ event, options }: TrackedEvent) => Promise<void>;
};
export {};
//# sourceMappingURL=segment.d.ts.map