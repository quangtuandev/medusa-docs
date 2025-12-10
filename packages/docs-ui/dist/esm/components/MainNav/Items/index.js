"use client";
import React from "react";
import { useMainNav } from "../../..";
import clsx from "clsx";
import { MainNavItemLink } from "./Link";
import { MainNavItemDropdown } from "./Dropdown";
export const MainNavItems = ({ className }) => {
    const { navItems, activeItemIndex } = useMainNav();
    return (React.createElement("ul", { className: clsx("hidden lg:flex justify-start gap-docs_1 items-center", "my-docs_0.75", className) }, navItems.map((item, index) => {
        const isActive = index === activeItemIndex;
        return (React.createElement("li", { className: clsx("flex items-center group"), key: index },
            item.type === "link" && (React.createElement(MainNavItemLink, { item: item, isActive: isActive })),
            item.type === "dropdown" && (React.createElement(MainNavItemDropdown, { item: item, isActive: isActive }))));
    })));
};
