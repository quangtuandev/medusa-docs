import { LineInputProps, LineOutputProps, Token, TokenInputProps, TokenOutputProps } from "prism-react-renderer";
import React from "react";
export type HighlightProps = {
    getLineProps: (input: LineInputProps) => LineOutputProps;
    getTokenProps: (input: TokenInputProps) => TokenOutputProps;
};
export type CollapsibleCodeLines = {
    collapsibleLinesStr?: string;
    getLines: (token: Token[][], highlightProps: HighlightProps, lineNumberOffset?: number) => React.JSX.Element[];
};
export type CollapsedCodeLinesPosition = "start" | "end";
export declare const useCollapsibleCodeLines: ({ collapsibleLinesStr, getLines, }: CollapsibleCodeLines) => {
    getCollapsibleElms: (children: React.ReactNode) => React.JSX.Element;
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    getCollapsedLinesElm: ({ tokens, highlightProps, }: {
        tokens: Token[][];
        highlightProps: HighlightProps;
    }) => React.JSX.Element;
    getNonCollapsedLinesElm: ({ tokens, highlightProps, }: {
        tokens: Token[][];
        highlightProps: HighlightProps;
    }) => React.JSX.Element[];
    type: CollapsedCodeLinesPosition | undefined;
    isCollapsible: (tokens: Token[][]) => boolean | undefined;
};
//# sourceMappingURL=index.d.ts.map