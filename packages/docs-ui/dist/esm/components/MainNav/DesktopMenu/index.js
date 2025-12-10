"use client";
import { BarsThree, Book, SidebarLeft, TimelineVertical } from "@medusajs/icons";
import React, { useMemo, useRef, useState } from "react";
import { Button, getOsShortcut, Menu, useClickOutside, useSidebar, } from "../../..";
import clsx from "clsx";
import { HouseIcon } from "../../Icons/House";
import { MainNavThemeMenu } from "./ThemeMenu";
export const MainNavDesktopMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { setDesktopSidebarOpen, isSidebarShown, desktopSidebarOpen } = useSidebar();
    const ref = useRef(null);
    useClickOutside({
        elmRef: ref,
        onClickOutside: () => setIsOpen(false),
    });
    const items = useMemo(() => {
        const items = [
            {
                type: "link",
                icon: React.createElement(HouseIcon, null),
                title: "Homepage",
                link: "https://medusajs.com",
            },
            {
                type: "link",
                icon: React.createElement(Book, null),
                title: "Medusa v1",
                link: "https://docs.medusajs.com/v1",
            },
            {
                type: "link",
                icon: React.createElement(TimelineVertical, null),
                title: "Changelog",
                link: "https://medusajs.com/changelog",
            },
        ];
        if (isSidebarShown) {
            items.push({
                type: "divider",
            }, {
                type: "action",
                title: desktopSidebarOpen ? "Hide Sidebar" : "Show Sidebar",
                icon: React.createElement(SidebarLeft, null),
                shortcut: `${getOsShortcut()}\\`,
                action: () => {
                    setDesktopSidebarOpen((prev) => !prev);
                    setIsOpen(false);
                },
            });
        }
        items.push({
            type: "divider",
        }, {
            type: "custom",
            content: React.createElement(MainNavThemeMenu, null),
        });
        return items;
    }, [isSidebarShown, desktopSidebarOpen]);
    return (React.createElement("div", { className: "relative hidden lg:flex justify-center items-center", ref: ref },
        React.createElement(Button, { variant: "transparent", onClick: () => setIsOpen((prev) => !prev), className: "!p-[6.5px]" },
            React.createElement(BarsThree, { className: "text-medusa-fg-subtle" })),
        React.createElement(Menu, { className: clsx("absolute top-[calc(100%+8px)] right-0 min-w-[200px]", !isOpen && "hidden"), items: items })));
};
