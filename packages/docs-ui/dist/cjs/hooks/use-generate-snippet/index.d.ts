import { SubscriberSnippetGeneratorOptions } from "./snippet-generators/subscriber";
export type UseGenerateSnippet = {
    type: "subscriber";
    options: SubscriberSnippetGeneratorOptions;
};
export declare const useGenerateSnippet: ({ type, options }: UseGenerateSnippet) => {
    snippet: string;
};
//# sourceMappingURL=index.d.ts.map