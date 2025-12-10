import { Plugin } from "unified";
type ParserPluginOptions = {
    [key: string]: unknown;
};
export type GetCleanMdOptions = {
    file: string;
    plugins?: {
        before?: Plugin[];
        after?: Plugin[];
    };
    parserOptions?: ParserPluginOptions;
    type?: "file" | "content";
};
export declare const getCleanMd: ({ file, plugins, parserOptions, type, }: GetCleanMdOptions) => Promise<string>;
export {};
//# sourceMappingURL=get-clean-md.d.ts.map