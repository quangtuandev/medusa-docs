import React from "react";
import { MenuProps } from "..";
import { MenuItemSubMenu } from "types";
type MenuSubMenuProps = Pick<MenuProps, "itemsOnClick"> & {
    item: MenuItemSubMenu;
};
export declare const MenuSubMenu: ({ item, itemsOnClick }: MenuSubMenuProps) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map