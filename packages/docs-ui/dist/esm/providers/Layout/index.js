"use client";
import useResizeObserver from "@react-hook/resize-observer";
import React, { createContext, createRef, useContext, useState } from "react";
export const LayoutProviderContext = createContext(null);
export const LayoutProvider = ({ children, disableResizeObserver = false, }) => {
    const mainContentRef = createRef();
    const [showCollapsedNavbar, setShowCollapsedNavbar] = useState(false);
    useResizeObserver(mainContentRef, () => {
        if (disableResizeObserver || window.innerWidth < 1024) {
            setShowCollapsedNavbar(false);
            return;
        }
        if (mainContentRef.current) {
            setShowCollapsedNavbar(mainContentRef.current.clientWidth < 1100);
        }
    });
    return (React.createElement(LayoutProviderContext.Provider, { value: { mainContentRef, showCollapsedNavbar } }, children));
};
export const useLayout = () => {
    const context = useContext(LayoutProviderContext);
    if (!context) {
        throw new Error("useLayout must be used inside a LayoutProvider");
    }
    return context;
};
