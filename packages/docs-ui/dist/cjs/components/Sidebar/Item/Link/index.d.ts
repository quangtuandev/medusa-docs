import React from "react";
import { Sidebar } from "types";
export type SidebarItemLinkProps = {
    item: Sidebar.SidebarItemLink;
    nested?: boolean;
    isParentCategoryOpen?: boolean;
} & React.AllHTMLAttributes<HTMLLIElement>;
export declare const SidebarItemLink: ({ item, className, nested, isParentCategoryOpen, }: SidebarItemLinkProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map