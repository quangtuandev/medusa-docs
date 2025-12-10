import React from "react";
import { Highlight } from "..";
import { RenderProps, Token } from "prism-react-renderer";
type CodeBlockLineProps = {
    line: Token[];
    highlights?: Highlight[];
    lineNumber: number;
    showLineNumber: boolean;
    lineNumberColorClassName: string;
    lineNumberBgClassName: string;
    isTerminal: boolean;
    animateTokenHighlights?: boolean;
} & Pick<RenderProps, "getLineProps" | "getTokenProps">;
export declare const CodeBlockLine: ({ line, highlights, lineNumber, getLineProps, getTokenProps, showLineNumber, lineNumberColorClassName, lineNumberBgClassName, isTerminal, animateTokenHighlights, }: CodeBlockLineProps) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map