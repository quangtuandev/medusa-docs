import React from "react";
import { Sidebar } from "types";
export type UseChildDocsProps = {
    onlyTopLevel?: boolean;
    type?: "sidebar" | "item";
    hideItems?: string[];
    showItems?: string[];
    hideTitle?: boolean;
    hideDescription?: boolean;
    titleLevel?: number;
    startChildLevel?: number;
    endChildLevel?: number;
    itemsPerRow?: number;
    defaultItemsPerRow?: number;
    search?: {
        enable: boolean;
        storageKey?: string;
        placeholder?: string;
    };
};
export declare const useChildDocs: ({ onlyTopLevel, hideItems, showItems, type, hideTitle, hideDescription, titleLevel, startChildLevel, endChildLevel, itemsPerRow, defaultItemsPerRow, search: { enable: enableSearch, storageKey, ...searchProps }, }: UseChildDocsProps) => {
    items: Sidebar.InteractiveSidebarItem[];
    component: React.JSX.Element;
};
//# sourceMappingURL=index.d.ts.map