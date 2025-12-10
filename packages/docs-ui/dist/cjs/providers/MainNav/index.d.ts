import React from "react";
import { NavigationItem } from "types";
export type MainNavContext = {
    navItems: NavigationItem[];
    activeItemIndex?: number;
    activeItem?: NavigationItem;
    editDate?: string;
};
export type MainNavProviderProps = {
    navItems: NavigationItem[];
    children?: React.ReactNode;
};
export declare const MainNavProvider: ({ navItems, children, }: MainNavProviderProps) => React.JSX.Element;
export declare const useMainNav: () => MainNavContext;
//# sourceMappingURL=index.d.ts.map