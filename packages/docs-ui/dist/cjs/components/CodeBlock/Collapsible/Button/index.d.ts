import React from "react";
import { CollapsibleReturn } from "../../../../hooks";
export type CodeBlockCollapsibleButtonProps = {
    type: "start" | "end";
    expandButtonLabel?: string;
    className?: string;
} & Omit<CollapsibleReturn, "getCollapsibleElms">;
export declare const CodeBlockCollapsibleButton: ({ type, expandButtonLabel, collapsed, setCollapsed, className, }: CodeBlockCollapsibleButtonProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map