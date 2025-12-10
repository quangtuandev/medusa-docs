"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
const ColorModeContext = createContext(null);
export const ColorModeProvider = ({ children }) => {
    const [colorMode, setColorMode] = useState("light");
    const [loaded, setLoaded] = useState(false);
    const toggleColorMode = () => setColorMode(colorMode === "light" ? "dark" : "light");
    useEffect(() => {
        if (loaded) {
            return;
        }
        const theme = localStorage.getItem("theme");
        if (theme && (theme === "light" || theme === "dark")) {
            setColorMode(theme);
        }
        setLoaded(true);
    }, []);
    useEffect(() => {
        document.querySelector("html")?.setAttribute("data-theme", colorMode);
    }, [colorMode]);
    useEffect(() => {
        if (!loaded) {
            return;
        }
        const theme = localStorage.getItem("theme");
        if (theme !== colorMode) {
            localStorage.setItem("theme", colorMode);
        }
    }, [loaded, colorMode]);
    return (React.createElement(ColorModeContext.Provider, { value: {
            colorMode,
            setColorMode,
            toggleColorMode,
        } }, children));
};
export const useColorMode = () => {
    const context = useContext(ColorModeContext);
    if (!context) {
        throw new Error("useColorMode must be used inside a ColorModeProvider");
    }
    return context;
};
