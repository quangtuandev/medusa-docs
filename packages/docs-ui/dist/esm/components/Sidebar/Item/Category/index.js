"use client";
// @refresh reset
import React, { useEffect, useMemo, useState } from "react";
import { Badge, Loading, SidebarItem, useSidebar } from "../../../..";
import clsx from "clsx";
import { TriangleDownMini, TriangleUpMini } from "@medusajs/icons";
export const SidebarItemCategory = ({ item, className, }) => {
    const [showLoading, setShowLoading] = useState(false);
    const [open, setOpen] = useState(item.initialOpen !== undefined ? item.initialOpen : false);
    const { isItemActive, updatePersistedCategoryState, getPersistedCategoryState, persistCategoryState, } = useSidebar();
    const itemShowLoading = useMemo(() => {
        return !item.loaded || (item.showLoadingIfEmpty && !item.children?.length);
    }, [item]);
    const isActive = useMemo(() => {
        return isItemActive({
            item,
        });
    }, [isItemActive, item]);
    useEffect(() => {
        if (open && itemShowLoading) {
            setShowLoading(true);
        }
    }, [open, itemShowLoading]);
    useEffect(() => {
        if (!itemShowLoading && showLoading) {
            setShowLoading(false);
        }
    }, [itemShowLoading, showLoading]);
    useEffect(() => {
        if (isActive && !open) {
            setOpen(true);
        }
    }, [isActive, item.children]);
    useEffect(() => {
        if (!persistCategoryState) {
            return;
        }
        const persistedOpen = getPersistedCategoryState(item.title);
        if (persistedOpen !== undefined && !isActive) {
            setOpen(persistedOpen);
        }
    }, [persistCategoryState]);
    const handleOpen = () => {
        if (!open) {
            item.onOpen?.();
        }
        if (persistCategoryState) {
            updatePersistedCategoryState(item.title, !open);
        }
        setOpen((prev) => !prev);
    };
    const isTitleOneWord = useMemo(() => item.title.split(" ").length === 1, [item.title]);
    return (React.createElement("div", { className: clsx("my-docs_0.75 first:!mt-0 w-full relative", className) },
        React.createElement("div", { className: "px-docs_0.75" },
            React.createElement("div", { className: clsx("py-docs_0.25 px-docs_0.5", "flex justify-between items-center gap-docs_0.5", "text-medusa-fg-muted", "cursor-pointer relative", "z-[2]", !isTitleOneWord && "break-words"), tabIndex: -1, onClick: handleOpen },
                React.createElement("span", { className: clsx("text-compact-x-small-plus", isTitleOneWord && "truncate") }, item.title),
                item.additionalElms,
                item.badge && (React.createElement(Badge, { variant: item.badge.variant }, item.badge.text)),
                !item.additionalElms && (React.createElement(React.Fragment, null,
                    open && React.createElement(TriangleDownMini, null),
                    !open && React.createElement(TriangleUpMini, null))))),
        !item.hideChildren && (React.createElement("ul", { className: clsx("ease-ease", "flex flex-col gap-docs_0.125", "z-[1] relative", !open && "overflow-hidden m-0 h-0") },
            item.children?.map((childItem, index) => (React.createElement(SidebarItem, { item: childItem, key: index, isParentCategoryOpen: open }))),
            showLoading && (React.createElement(Loading, { count: 3, className: "!mb-0 !px-docs_0.5", barClassName: "h-[20px]" }))))));
};
