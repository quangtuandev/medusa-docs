import { Sidebar } from "types";
export declare const isSidebarItemLink: (item: Sidebar.SidebarItem | undefined, options?: {
    checkRef?: boolean;
    checkExternal?: boolean;
}) => item is Sidebar.SidebarItemLink;
export declare const areSidebarItemsEqual: ({ itemA, itemB, compareTitles, }: {
    itemA: Sidebar.SidebarItem;
    itemB: Sidebar.SidebarItem;
    compareTitles?: boolean | undefined;
}) => boolean;
export declare const findSidebarItem: ({ sidebarItems, item, checkChildren, compareTitles, }: {
    sidebarItems: Sidebar.SidebarItem[];
    item: Sidebar.SidebarItem;
    checkChildren?: boolean | undefined;
    compareTitles?: boolean | undefined;
}) => Sidebar.SidebarItem | undefined;
export declare const getSidebarItemWithHistory: ({ sidebarItems, item, sidebarHistory, checkChildren, compareTitles, }: {
    sidebarItems: Sidebar.SidebarItem[];
    item: Sidebar.SidebarItem;
    sidebarHistory?: string[] | undefined;
    checkChildren?: boolean | undefined;
    compareTitles?: boolean | undefined;
}) => {
    item: Sidebar.SidebarItem | undefined;
    sidebarHistory: string[];
};
//# sourceMappingURL=sidebar-utils.d.ts.map