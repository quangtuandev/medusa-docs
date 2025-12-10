import React from "react";
import { CollapsibleReturn } from "../../../../hooks";
export type CodeBlockCollapsibleLinesProps = {
    children: React.ReactNode;
    type: "start" | "end";
} & Omit<CollapsibleReturn, "setCollapsed">;
export declare const CodeBlockCollapsibleLines: ({ children, type, collapsed, }: CodeBlockCollapsibleLinesProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map