"use client";
// @refresh reset
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Badge, checkSidebarItemVisibility, SidebarItem, useMobile, useSidebar, } from "../../../..";
import clsx from "clsx";
import Link from "next/link";
export const SidebarItemLink = ({ item, className, nested = false, isParentCategoryOpen, }) => {
    const { isItemActive, setMobileSidebarOpen: setSidebarOpen, disableActiveTransition, sidebarRef, sidebarTopHeight, } = useSidebar();
    const { isMobile } = useMobile();
    const active = useMemo(() => isItemActive({
        item,
        checkLinkChildren: false,
    }), [isItemActive, item]);
    const ref = useRef(null);
    const getNewTopCalculator = useCallback(() => {
        if (!sidebarRef.current || !ref.current) {
            return 0;
        }
        const sidebarBoundingRect = sidebarRef.current.getBoundingClientRect();
        const itemBoundingRect = ref.current.getBoundingClientRect();
        return (itemBoundingRect.top -
            (sidebarBoundingRect.top + sidebarTopHeight) +
            sidebarRef.current.scrollTop -
            10 // remove extra margin just in case
        );
    }, [sidebarTopHeight, sidebarRef.current, ref.current]);
    useEffect(() => {
        if (!active ||
            !ref.current ||
            !sidebarRef.current ||
            isMobile ||
            !isParentCategoryOpen) {
            return;
        }
        const isVisible = checkSidebarItemVisibility(ref.current.children.item(0) || ref.current, !disableActiveTransition);
        if (isVisible) {
            return;
        }
        if (!disableActiveTransition) {
            ref.current.scrollIntoView({
                block: "center",
            });
        }
        else {
            sidebarRef.current.scrollTo({
                top: getNewTopCalculator(),
            });
        }
    }, [
        active,
        sidebarRef.current,
        disableActiveTransition,
        isMobile,
        ref.current,
        getNewTopCalculator,
        isParentCategoryOpen,
    ]);
    useEffect(() => {
        if (active && isMobile) {
            setSidebarOpen(false);
        }
    }, [active, isMobile]);
    const hasChildren = useMemo(() => {
        return !item.hideChildren && (item.children?.length || 0) > 0;
    }, [item.children]);
    const isTitleOneWord = useMemo(() => item.title.split(" ").length === 1, [item.title]);
    return (React.createElement("li", { ref: ref },
        React.createElement("span", { className: "block px-docs_0.75" },
            React.createElement(Link, { href: item.isPathHref ? item.path : `#${item.path}`, className: clsx("py-docs_0.25 px-docs_0.5", "block w-full rounded-docs_sm", !isTitleOneWord && "break-words", active && [
                    "bg-medusa-bg-base",
                    "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark",
                    "text-medusa-fg-base",
                ], !active && [
                    !nested && "text-medusa-fg-subtle",
                    nested && "text-medusa-fg-muted",
                    "hover:bg-medusa-bg-base-hover lg:hover:bg-medusa-bg-subtle-hover",
                ], "text-compact-small-plus", "flex justify-between items-center gap-[6px]", className), target: item.type === "external" ? "_blank" : undefined, rel: item.type === "external" ? "noopener noreferrer" : undefined, ...item.linkProps },
                React.createElement("span", { className: clsx(isTitleOneWord && "truncate", nested && "inline-block pl-docs_1.5") }, item.title),
                item.additionalElms,
                item.badge && (React.createElement(Badge, { variant: item.badge.variant }, item.badge.text)))),
        hasChildren && (React.createElement("ul", { className: clsx("ease-ease overflow-hidden", "flex flex-col gap-docs_0.125", "pt-docs_0.125 pb-docs_0.5") }, item.children.map((childItem, index) => (React.createElement(SidebarItem, { item: childItem, key: index, nested: !item.childrenSameLevel, isParentCategoryOpen: isParentCategoryOpen })))))));
};
