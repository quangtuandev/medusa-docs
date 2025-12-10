"use client";
import React, { useContext, useEffect, useState } from "react";
const BrowserContext = React.createContext(null);
export const BrowserProvider = ({ children }) => {
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
        setIsBrowser(typeof window !== "undefined");
    }, []);
    return (React.createElement(BrowserContext.Provider, { value: {
            isBrowser,
        } }, children));
};
export const useIsBrowser = () => {
    const context = useContext(BrowserContext);
    if (!context) {
        throw new Error("useIsBrowser must be used within a BrowserProvider");
    }
    return context;
};
