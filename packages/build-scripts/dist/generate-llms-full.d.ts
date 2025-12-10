import { GetCleanMdOptions } from "docs-utils";
type FileExt = "md" | "yaml";
type Options = {
    outputPath: string;
    scanDirs: {
        dir: string;
        options?: Omit<GetCleanMdOptions, "file" | "type">;
        allowedFilesPatterns?: RegExp[];
        generator?: {
            name: "workflows" | "steps" | "jsSdk" | "apiRef";
            options: Record<string, unknown>;
        };
        ext?: FileExt;
    }[];
    introText?: string;
    plugins?: GetCleanMdOptions["plugins"];
};
export declare const generateLlmsFull: ({ outputPath, scanDirs, introText, plugins, }: Options) => Promise<void>;
export {};
//# sourceMappingURL=generate-llms-full.d.ts.map