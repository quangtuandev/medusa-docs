"use client";
import React from "react";
import { useLayout, useSidebar, useSiteConfig, } from "../..";
export const MainNav = ({ className, itemsClassName }) => {
    const { setMobileSidebarOpen, isSidebarShown } = useSidebar();
    const { config } = useSiteConfig();
    const { showCollapsedNavbar } = useLayout();
    return (React.createElement("div", null,
        React.createElement("h1", null, "MainNav")));
};
