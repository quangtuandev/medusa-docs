import React from "react";
import { BaseTabType } from "../../../hooks";
type CodeTabProps = BaseTabType & {
    children: React.ReactNode;
    isSelected?: boolean;
    blockStyle?: string;
    changeSelectedTab?: (tab: BaseTabType) => void;
    pushRef?: (tabButton: HTMLButtonElement | null) => void;
};
export declare const CodeTab: ({ label, value, isSelected, blockStyle, changeSelectedTab, pushRef, }: CodeTabProps) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map