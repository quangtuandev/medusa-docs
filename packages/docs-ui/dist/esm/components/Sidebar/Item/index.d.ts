import React from "react";
import { Sidebar } from "types";
export type SidebarItemProps = {
    item: Sidebar.SidebarItem;
    nested?: boolean;
    hasNextItems?: boolean;
    isParentCategoryOpen?: boolean;
} & React.AllHTMLAttributes<HTMLElement>;
export declare const SidebarItem: ({ item, hasNextItems, ...props }: SidebarItemProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map