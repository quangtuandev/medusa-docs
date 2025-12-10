import React from "react";
import { MenuItem } from "types";
import { SelectedMenu } from "..";
type MainNavMobileSubMenuProps = {
    menu: MenuItem[];
    title: string;
    setSelectedMenus: React.Dispatch<React.SetStateAction<SelectedMenu>>;
    onOpenLink?: () => void;
};
export declare const MainNavMobileSubMenu: ({ menu, title, setSelectedMenus, onOpenLink, }: MainNavMobileSubMenuProps) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map