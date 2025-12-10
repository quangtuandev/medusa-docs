export type CustomLlmsGenerator<T = Record<string, unknown>> = (files: string[], options?: T) => Promise<string>;
type CommonOptions = {
    baseUrl?: string;
};
export declare const workflowsLlmsGenerator: CustomLlmsGenerator<CommonOptions>;
export declare const stepsLlmsGenerator: CustomLlmsGenerator<CommonOptions>;
export declare const jsSdkLlmsGenerator: CustomLlmsGenerator<CommonOptions & {
    type: "Admin" | "Store" | "Auth";
}>;
export declare const apiRefLlmsGenerator: CustomLlmsGenerator<CommonOptions & {
    type: "Admin" | "Store";
}>;
/**
 * Helpers
 */
export declare const generateListForReferenceFiles: ({ files, title, itemContent, options, }: {
    files: string[];
    title: string;
    itemContent: (title: string, fileSlug: string) => string;
    options?: CommonOptions | undefined;
}) => Promise<string>;
export {};
//# sourceMappingURL=custom-llms-generators.d.ts.map