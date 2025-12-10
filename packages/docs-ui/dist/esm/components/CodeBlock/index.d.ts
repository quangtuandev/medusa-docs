import React from "react";
import { HighlightProps } from "prism-react-renderer";
import { CodeBlockHeaderMeta } from "./Header";
import { ApiAuthType, ApiDataOptions, ApiMethod } from "types";
export type Highlight = {
    line: number;
    text?: string;
    tooltipText?: string;
};
export type CodeBlockMetaFields = {
    title?: string;
    hasTabs?: boolean;
    npm2yarn?: boolean;
    highlights?: string[][];
    apiTesting?: boolean;
    testApiMethod?: ApiMethod;
    testApiUrl?: string;
    testAuthType?: ApiAuthType;
    testPathParams?: ApiDataOptions;
    testQueryParams?: ApiDataOptions;
    testBodyParams?: ApiDataOptions;
    noCopy?: boolean;
    noReport?: boolean;
    noLineNumbers?: boolean;
    noAskAi?: boolean;
    collapsibleLines?: string;
    expandButtonLabel?: string;
    isTerminal?: boolean;
    forceNoTitle?: boolean;
    collapsed?: boolean;
    wrapperClassName?: string;
} & CodeBlockHeaderMeta;
export type CodeBlockStyle = "loud" | "subtle" | "inline";
export type CodeBlockProps = {
    source: string;
    lang?: string;
    innerClassName?: string;
    className?: string;
    blockStyle?: CodeBlockStyle;
    children?: React.ReactNode;
    style?: React.HTMLAttributes<HTMLDivElement>["style"];
    animateTokenHighlights?: boolean;
    overrideColors?: {
        bg?: string;
        innerBg?: string;
        lineNumbersBg?: string;
        border?: string;
        innerBorder?: string;
        boxShadow?: string;
    };
} & CodeBlockMetaFields & Omit<HighlightProps, "code" | "language" | "children">;
export declare const CodeBlock: ({ source, hasTabs, lang, wrapperClassName, innerClassName, className, overrideColors, collapsed, title, highlights, apiTesting, blockStyle, noCopy, noReport, noLineNumbers, children, collapsibleLines, expandButtonLabel, isTerminal, style, forceNoTitle, animateTokenHighlights, noAskAi, ...rest }: CodeBlockProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map