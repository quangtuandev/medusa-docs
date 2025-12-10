import React from "react";
import { Sidebar } from "types";
export type SidebarItemSubCategoryProps = {
    item: Sidebar.SidebarItemSubCategory;
    nested?: boolean;
    isParentCategoryOpen?: boolean;
} & React.AllHTMLAttributes<HTMLLIElement>;
export declare const SidebarItemSubCategory: ({ item, className, nested, isParentCategoryOpen, }: SidebarItemSubCategoryProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map