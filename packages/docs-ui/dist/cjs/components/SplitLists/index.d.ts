import React from "react";
type SplitListItem = {
    title: string;
    link: string;
    description?: string;
};
export type SplitListProps = {
    items: SplitListItem[];
    listsNum?: number;
};
export declare const SplitList: ({ items, listsNum }: SplitListProps) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map