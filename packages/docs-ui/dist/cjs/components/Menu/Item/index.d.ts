import React from "react";
import { MenuItem as MenuItemType, MenuItemLink } from "types";
export type MenuItemProps = {
    item: MenuItemLink;
    onClick?: (item: MenuItemType) => void;
};
export declare const MenuItem: ({ item, onClick }: MenuItemProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map