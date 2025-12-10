import posthog from "posthog-js";
export const usePostHogAnalytics = () => {
    const track = async ({ event, options }) => {
        posthog.capture(event, options);
    };
    return {
        track,
    };
};
