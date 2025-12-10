"use client";
import { useCallback, useEffect } from "react";
import { useIsBrowser } from "../..";
export const useClickOutside = ({ elmRef, onClickOutside, }) => {
    const { isBrowser } = useIsBrowser();
    const checkClickOutside = useCallback((e) => {
        const node = e.target;
        if (!elmRef.current?.contains(node) && node.isConnected) {
            onClickOutside(e);
        }
    }, [elmRef.current, onClickOutside]);
    useEffect(() => {
        if (!isBrowser) {
            return;
        }
        window.document.addEventListener("click", checkClickOutside);
        return () => {
            window.document.removeEventListener("click", checkClickOutside);
        };
    }, [isBrowser, checkClickOutside]);
};
