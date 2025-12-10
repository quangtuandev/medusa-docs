import React from "react";
export type CodeBlockActionsProps = {
    source: string;
    isSingleLine?: boolean;
    inHeader: boolean;
    showGradientBg?: boolean;
    inInnerCode?: boolean;
    isCollapsed: boolean;
    canShowApiTesting?: boolean;
    onApiTesting?: React.Dispatch<React.SetStateAction<boolean>>;
    noReport?: boolean;
    noCopy?: boolean;
    noAskAi?: boolean;
};
export declare const CodeBlockActions: ({ source, inHeader, showGradientBg, inInnerCode, isCollapsed, isSingleLine, canShowApiTesting, onApiTesting, noReport, noCopy, noAskAi, }: CodeBlockActionsProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map