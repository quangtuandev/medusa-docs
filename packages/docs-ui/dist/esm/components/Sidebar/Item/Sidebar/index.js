"use client";
// @refresh reset
import React, { useMemo } from "react";
import { Badge, useSidebar } from "../../../..";
import clsx from "clsx";
import Link from "next/link";
export const SidebarItemSidebar = ({ item, className, nested = false, }) => {
    const { getSidebarFirstLinkChild: getSidebarFirstChild } = useSidebar();
    const isTitleOneWord = useMemo(() => item.title.split(" ").length === 1, [item.title]);
    const firstChild = useMemo(() => getSidebarFirstChild(item), [item]);
    return (React.createElement("li", null,
        React.createElement("span", { className: "block px-docs_0.75" },
            React.createElement(Link, { href: firstChild?.isPathHref ? firstChild.path : `#${firstChild?.path}`, className: clsx("py-docs_0.25 px-docs_0.5", "block w-full rounded-docs_sm", !isTitleOneWord && "break-words", !nested && "text-medusa-fg-subtle", nested && "text-medusa-fg-muted", "hover:bg-medusa-bg-base-hover lg:hover:bg-medusa-bg-subtle-hover", "text-compact-small-plus", "flex justify-between items-center gap-[6px]", className), ...firstChild?.linkProps },
                React.createElement("span", { className: clsx(isTitleOneWord && "truncate", nested && "inline-block pl-docs_1.5") }, item.title),
                item.additionalElms,
                item.badge && (React.createElement(Badge, { variant: item.badge.variant }, item.badge.text))))));
};
