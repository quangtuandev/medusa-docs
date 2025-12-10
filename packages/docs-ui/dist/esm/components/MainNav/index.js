"use client";
import React from "react";
import { useLayout, useSidebar, useSiteConfig, } from "../..";
import { MainNavDesktopMenu } from "./DesktopMenu";
import { MainNavMobileMenu } from "./MobileMenu";
export const MainNav = ({ className, itemsClassName }) => {
    const { setMobileSidebarOpen, isSidebarShown } = useSidebar();
    const { config } = useSiteConfig();
    const { showCollapsedNavbar } = useLayout();
    return (React.createElement("div", null,
        React.createElement(MainNavDesktopMenu, null),
        React.createElement(MainNavMobileMenu, null)));
};
