import React from "react";
import { CodeBlockProps } from "../CodeBlock";
export type VerticalCodeTab = {
    title: string;
    code: CodeBlockProps;
} & Record<string, unknown>;
export type VerticalCodeTabsProps = {
    tabs: VerticalCodeTab[];
    className?: string;
    selectedTabIndex: number;
    setSelectedTabIndex: (value: number) => void;
};
export declare const VerticalCodeTabs: ({ tabs, className, selectedTabIndex, setSelectedTabIndex, }: VerticalCodeTabsProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map