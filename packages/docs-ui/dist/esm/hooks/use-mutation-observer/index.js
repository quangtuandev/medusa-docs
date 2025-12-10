"use client";
import { useEffect } from "react";
export const useMutationObserver = ({ elm, callback, options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
}, }) => {
    useEffect(() => {
        if (elm) {
            const observer = new MutationObserver(callback);
            observer.observe(elm, options);
            return () => observer.disconnect();
        }
    }, [callback, options]);
};
