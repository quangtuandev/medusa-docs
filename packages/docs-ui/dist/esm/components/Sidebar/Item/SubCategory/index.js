"use client";
// @refresh reset
import React, { useMemo, useRef } from "react";
import { Badge, SidebarItem } from "../../../..";
import clsx from "clsx";
export const SidebarItemSubCategory = ({ item, className, nested = false, isParentCategoryOpen, }) => {
    const ref = useRef(null);
    const hasChildren = useMemo(() => {
        return !item.hideChildren && (item.children?.length || 0) > 0;
    }, [item.children]);
    const isTitleOneWord = useMemo(() => item.title.split(" ").length === 1, [item.title]);
    return (React.createElement("li", { ref: ref },
        React.createElement("span", { className: "block px-docs_0.75" },
            React.createElement("span", { className: clsx("py-docs_0.25 px-docs_0.5", "block w-full", !isTitleOneWord && "break-words", !nested && "text-medusa-fg-subtle", nested && "text-medusa-fg-muted", "text-compact-small-plus", className) },
                React.createElement("span", { className: clsx(isTitleOneWord && "truncate", nested && "pl-docs_1.5") }, item.title),
                item.additionalElms,
                item.badge && (React.createElement(Badge, { variant: item.badge.variant }, item.badge.text)))),
        hasChildren && (React.createElement("ul", { className: clsx("ease-ease overflow-hidden", "flex flex-col gap-docs_0.125", "pb-docs_0.5 pt-docs_0.125") }, item.children.map((childItem, index) => (React.createElement(SidebarItem, { item: childItem, key: index, nested: !item.childrenSameLevel, isParentCategoryOpen: isParentCategoryOpen })))))));
};
