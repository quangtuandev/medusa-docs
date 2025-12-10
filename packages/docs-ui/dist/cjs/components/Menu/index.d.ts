import React from "react";
import { MenuItem as MenuItemType } from "types";
export type MenuProps = {
    items: MenuItemType[];
    className?: string;
    itemsOnClick?: (item: MenuItemType) => void;
};
export declare const Menu: ({ items, className, itemsOnClick }: MenuProps) => React.JSX.Element;
export * from "./Dropdown";
//# sourceMappingURL=index.d.ts.map