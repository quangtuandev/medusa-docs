import React from "react";
export type ExtraData = {
    section?: string;
    [key: string]: unknown;
};
export type AnalyticsContextType = {
    track: ({ event, instant, }: {
        event: TrackedEvent;
        instant?: boolean;
    }) => void;
};
type Trackers = "segment" | "posthog";
export type TrackedEvent = {
    event: string;
    options?: Record<string, unknown>;
    callback?: () => void;
    tracker?: Trackers | Trackers[];
};
export type AnalyticsProviderProps = {
    segmentWriteKey?: string;
    reoDevKey?: string;
    children?: React.ReactNode;
};
export declare const AnalyticsProvider: ({ segmentWriteKey, reoDevKey, children, }: AnalyticsProviderProps) => React.JSX.Element;
export declare const useAnalytics: () => AnalyticsContextType;
export {};
//# sourceMappingURL=index.d.ts.map