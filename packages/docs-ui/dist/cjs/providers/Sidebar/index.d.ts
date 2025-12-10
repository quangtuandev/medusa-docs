import React from "react";
import { Sidebar } from "types";
import { SidebarItemCategory, SidebarItemSidebar } from "types/dist/sidebar";
export type SidebarActionOptions = {
    sidebar_id: string;
    /**
     * When specified, the items are added as children of the parent item
     */
    parent?: {
        type: Sidebar.InteractiveSidebarItemTypes;
        path: string;
        title: string;
        /**
         * Whether to change the loaded state of the parent item
         */
        changeLoaded?: boolean;
    };
    /**
     * The position to insert the items at
     */
    indexPosition?: number;
    /**
     * If enabled, the items are filtered to not add items that already exist
     */
    ignoreExisting?: boolean;
};
export type SidebarStyleOptions = {
    /**
     * Useful for projects that have nested sidebars.
     */
    disableActiveTransition?: boolean;
};
export type UpdateSidebarItemTypes = Partial<Pick<Sidebar.SidebarItemLink, "path" | "title" | "additionalElms">> | Partial<Pick<SidebarItemCategory, "title" | "loaded" | "onOpen" | "children">> | Partial<Pick<SidebarItemSidebar, "title" | "children">>;
export type UpdateActionType = {
    sidebar_id: string;
    items: {
        existingItem: Sidebar.SidebarItem;
        newItem: UpdateSidebarItemTypes;
        options?: {
            setChildrenBehavior: "replace" | "merge";
        };
    }[];
};
export type SidebarContextType = {
    sidebars: Sidebar.Sidebar[];
    /**
     * The sidebar that is currently shown
     */
    shownSidebar: Sidebar.Sidebar | Sidebar.SidebarItemSidebar | undefined;
    activePath: string | null;
    activeItem: Sidebar.SidebarItemLink | null;
    setActivePath: (path: string | null) => void;
    /**
     * Check if an item is active. This includes checking its child items,
     * so for UI links that have children, the `checkLinkChildren` option should be set to `false`
     * to ensure that the link isn't shown as active if a child link is active.
     */
    isItemActive: (options: {
        item: Sidebar.InteractiveSidebarItem;
        checkLinkChildren?: boolean;
    }) => boolean;
    addItems: (items: Sidebar.SidebarItem[], options?: SidebarActionOptions) => void;
    updateItems: (options: UpdateActionType) => void;
    removeItems: (options: {
        items: Sidebar.SidebarItem[];
        sidebar_id: string;
    }) => void;
    mobileSidebarOpen: boolean;
    setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    desktopSidebarOpen: boolean;
    setDesktopSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSidebarStatic: boolean;
    /**
     * Whether the active path should change when the hash changes
     * This is only used by the API reference
     */
    shouldHandleHashChange: boolean;
    sidebarRef: React.RefObject<HTMLDivElement | null>;
    /**
     * Go back in the sidebar history
     */
    goBack: () => void;
    /**
     * The height of the top part of the sidebar
     */
    sidebarTopHeight: number;
    setSidebarTopHeight: React.Dispatch<React.SetStateAction<number>>;
    /**
     * Reset the sidebar to its initial state (the sidebars passed as a prop)
     */
    resetItems: () => void;
    updatePersistedCategoryState: (title: string, opened: boolean) => void;
    getPersistedCategoryState: (title: string) => boolean | undefined;
    persistCategoryState: boolean;
    isSidebarShown: boolean;
    sidebarHistory: string[];
    /**
     * Get the first link child of a sidebar
     */
    getSidebarFirstLinkChild: (sidebar: Sidebar.Sidebar | Sidebar.SidebarItemSidebar) => Sidebar.SidebarItemLink | undefined;
    getSidebar: (sidebar_id: string) => Sidebar.Sidebar | Sidebar.SidebarItemSidebar;
} & SidebarStyleOptions;
export declare const SidebarContext: React.Context<SidebarContextType | null>;
export type ActionType = {
    type: "add" | "update-child";
    items: Sidebar.SidebarItem[];
    options?: SidebarActionOptions;
} | {
    type: "replace";
    sidebars: Sidebar.Sidebar[];
} | {
    type: "remove";
    items: Sidebar.SidebarItem[];
    sidebar_id: string;
} | ({
    type: "update";
} & UpdateActionType);
export declare const reducer: (state: Sidebar.Sidebar[], actionData: ActionType) => Sidebar.Sidebar[];
export type SidebarProviderProps = {
    children?: React.ReactNode;
    isLoading?: boolean;
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    sidebars: Sidebar.Sidebar[];
    shouldHandleHashChange?: boolean;
    shouldHandlePathChange?: boolean;
    scrollableElement?: Element | Window;
    isSidebarStatic?: boolean;
    persistCategoryState?: boolean;
    disableActiveTransition?: boolean;
} & SidebarStyleOptions;
export declare const SidebarProvider: ({ children, isLoading, setIsLoading, sidebars: initialSidebars, shouldHandleHashChange, shouldHandlePathChange, scrollableElement, isSidebarStatic, persistCategoryState, disableActiveTransition, }: SidebarProviderProps) => React.JSX.Element;
export declare const useSidebar: () => SidebarContextType;
//# sourceMappingURL=index.d.ts.map