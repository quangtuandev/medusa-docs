import { MenuItem, NavigationItem } from "types";
type Options = {
    basePath: string;
};
export declare function getNavDropdownItems({ basePath }: Options): NavigationItem[];
export declare function normalizeMenuItems({ basePath, items, }: {
    basePath: string;
    items: MenuItem[];
}): MenuItem[];
export {};
//# sourceMappingURL=get-navbar-items.d.ts.map