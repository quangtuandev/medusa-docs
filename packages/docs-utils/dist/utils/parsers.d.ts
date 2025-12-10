import { UnistNodeWithData, UnistTree } from "types";
import { VisitorResult } from "unist-util-visit";
export type ComponentParser<TOptions = any> = (node: UnistNodeWithData, index: number, parent: UnistTree, options?: TOptions) => VisitorResult;
export declare const parseCard: ComponentParser;
export declare const parseCardList: ComponentParser;
export declare const parseCodeTabs: ComponentParser;
export declare const parseDetails: ComponentParser;
export declare const parseNote: ComponentParser;
export declare const parsePrerequisites: ComponentParser;
export declare const parseSourceCodeLink: ComponentParser;
export declare const parseTable: ComponentParser;
export declare const parseTabs: ComponentParser;
export declare const parseTypeList: ComponentParser;
export declare const parseWorkflowDiagram: ComponentParser;
export declare const parseComponentExample: ComponentParser<{
    examplesBasePath: string;
}>;
export declare const parseComponentReference: ComponentParser<{
    specsPath: string;
}>;
export declare const parsePackageInstall: ComponentParser;
export declare const parseIconSearch: ComponentParser<{
    iconNames: string[];
}>;
export declare const parseHookValues: ComponentParser<{
    hooksData: {
        [k: string]: {
            value: string;
            type?: {
                type: string;
            };
            description?: string;
        }[];
    };
}>;
export declare const parseColors: ComponentParser<{
    colors: {
        [k: string]: Record<string, string>;
    };
}>;
export declare const parseSplitList: ComponentParser;
export declare const parseEventHeader: ComponentParser;
//# sourceMappingURL=parsers.d.ts.map