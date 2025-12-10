"use client";
import { useCallback, useEffect, useRef, useState } from "react";
export const useCopy = (text) => {
    const [isCopied, setIsCopied] = useState(false);
    const copyTimeout = useRef(0);
    const handleCopy = useCallback(() => {
        navigator.clipboard
            .writeText(text.trim())
            .then(() => {
            setIsCopied(true);
            copyTimeout.current = window.setTimeout(() => {
                setIsCopied(false);
            }, 1000);
        })
            .catch(console.error);
    }, [text]);
    useEffect(() => () => window.clearTimeout(copyTimeout.current), []);
    return { isCopied, handleCopy };
};
