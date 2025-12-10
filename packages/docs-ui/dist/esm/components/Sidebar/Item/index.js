"use client";
import React from "react";
import { SidebarItemLink } from "./Link";
import { SidebarItemSubCategory } from "./SubCategory";
import { DottedSeparator } from "../..";
import { SidebarItemCategory } from "./Category";
import { SidebarItemSidebar } from "./Sidebar";
export const SidebarItem = ({ item, hasNextItems = false, ...props }) => {
    switch (item.type) {
        case "category":
            return (React.createElement(React.Fragment, null,
                React.createElement(SidebarItemCategory, { item: item, ...props }),
                hasNextItems && React.createElement(DottedSeparator, null)));
        case "sub-category":
            return React.createElement(SidebarItemSubCategory, { item: item, ...props });
        case "link":
        case "ref":
        case "external":
            return React.createElement(SidebarItemLink, { item: item, ...props });
        case "sidebar":
            return React.createElement(SidebarItemSidebar, { item: item, ...props });
        case "separator":
            return React.createElement(DottedSeparator, null);
    }
};
