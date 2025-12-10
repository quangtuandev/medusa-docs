import React from "react";
import { CollapsibleReturn } from "../../../../hooks";
export type CodeBlockCollapsibleFadeProps = {
    type: "start" | "end";
    hasHeader?: boolean;
} & Pick<CollapsibleReturn, "collapsed">;
export declare const CodeBlockCollapsibleFade: ({ type, hasHeader, collapsed, }: CodeBlockCollapsibleFadeProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map