export type SubscriberSnippetGeneratorOptions = {
    event: string;
    payload: Record<string, unknown> | string;
};
export declare const subscriberSnippetGenerator: ({ event, payload: initialPayload, }: SubscriberSnippetGeneratorOptions) => string;
//# sourceMappingURL=subscriber.d.ts.map