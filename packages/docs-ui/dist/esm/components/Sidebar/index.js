"use client";
import React, { Suspense, useMemo, useRef } from "react";
import { useSidebar } from "../../providers";
import clsx from "clsx";
import { Loading } from "../../components";
import { SidebarItem } from "./Item";
// @ts-expect-error can't install the types package because it doesn't support React v19
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { SidebarTop } from "./Top";
import { useClickOutside, useKeyboardShortcut } from "../../hooks";
import useResizeObserver from "@react-hook/resize-observer";
import { isSidebarItemLink } from "../../utils/sidebar-utils";
export const Sidebar = ({ className = "" }) => {
    const sidebarWrapperRef = useRef(null);
    const sidebarTopRef = useRef(null);
    const { sidebars, shownSidebar, mobileSidebarOpen, setMobileSidebarOpen, isSidebarStatic, sidebarRef, desktopSidebarOpen, setDesktopSidebarOpen, setSidebarTopHeight, sidebarHistory, } = useSidebar();
    useClickOutside({
        elmRef: sidebarWrapperRef,
        onClickOutside: () => {
            if (mobileSidebarOpen) {
                setMobileSidebarOpen(false);
            }
        },
    });
    useKeyboardShortcut({
        metakey: true,
        shortcutKeys: ["\\"],
        action: () => {
            setDesktopSidebarOpen((prev) => !prev);
        },
    });
    useResizeObserver(sidebarTopRef, () => {
        setSidebarTopHeight(sidebarTopRef.current?.clientHeight || 0);
    });
    const sidebarItems = useMemo(() => {
        return shownSidebar && "items" in shownSidebar
            ? shownSidebar.items
            : shownSidebar?.children || [];
    }, [shownSidebar]);
    return (React.createElement(React.Fragment, null,
        mobileSidebarOpen && (React.createElement("div", { className: clsx("lg:hidden bg-medusa-bg-overlay opacity-70", "fixed top-0 left-0 w-full h-full z-[45]") })),
        React.createElement("aside", { className: clsx("bg-medusa-bg-base lg:bg-transparent block", "fixed -left-full top-0 h-[calc(100%-16px)] transition-[left] lg:relative lg:h-auto", "max-w-sidebar-xs sm:max-w-sidebar-sm md:max-w-sidebar-md lg:max-w-sidebar-lg", "xl:max-w-sidebar-xl xxl:max-w-sidebar-xxl xxxl:max-w-sidebar-xxxl", "w-sidebar-xs sm:w-auto", mobileSidebarOpen && [
                "!left-docs_0.5 !top-docs_0.5 z-50 shadow-elevation-modal dark:shadow-elevation-modal-dark",
                "rounded",
                "lg:!left-0 lg:!top-0 lg:shadow-none",
            ], desktopSidebarOpen && "lg:left-0", !desktopSidebarOpen && "lg:!absolute lg:!-left-full", className), style: {
                animationFillMode: "forwards",
            }, ref: sidebarWrapperRef },
            React.createElement("ul", { className: clsx("h-full w-full", "flex flex-col") },
                React.createElement(SwitchTransition, null,
                    React.createElement(CSSTransition, { key: sidebarHistory.length
                            ? sidebarHistory[sidebarHistory.length - 1]
                            : sidebars[0].sidebar_id, nodeRef: sidebarRef, classNames: {
                            enter: "animate-fadeInLeft animate-fast",
                            exit: "animate-fadeOutLeft animate-fast",
                        }, timeout: 200 },
                        React.createElement("div", { className: clsx("overflow-y-scroll clip", "pb-docs_0.75 flex-1 max-h-screen"), ref: sidebarRef, id: "sidebar" },
                            React.createElement(SidebarTop, { ref: sidebarTopRef }),
                            React.createElement("div", { className: "pt-docs_0.75" },
                                !sidebarItems.length && !isSidebarStatic && (React.createElement(Loading, { className: "px-docs_0.75" })),
                                sidebarItems.map((item, index) => {
                                    const itemKey = item.type === "separator"
                                        ? index
                                        : isSidebarItemLink(item)
                                            ? `${item.path}-${index}`
                                            : `${item.title}-${index}`;
                                    return (React.createElement(Suspense, { fallback: React.createElement(Loading, { count: 1, className: "!mb-0 !px-docs_0.5", barClassName: "h-[20px]" }), key: itemKey },
                                        React.createElement(SidebarItem, { item: item, hasNextItems: index !== sidebarItems.length - 1 })));
                                })))))))));
};
