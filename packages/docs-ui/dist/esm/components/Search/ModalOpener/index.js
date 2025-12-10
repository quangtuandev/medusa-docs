"use client";
import React from "react";
import { useSearch } from "../../../providers";
import { Button } from "../../../components";
import { MagnifyingGlass } from "@medusajs/icons";
import { useKeyboardShortcut } from "../../../hooks";
export const SearchModalOpener = ({ isLoading = false, }) => {
    const { setIsOpen } = useSearch();
    useKeyboardShortcut({
        shortcutKeys: ["k"],
        action: () => setIsOpen((prev) => !prev),
        isLoading,
    });
    const handleOpen = (e) => {
        if (isLoading) {
            return;
        }
        e.preventDefault();
        if ("blur" in e.target && typeof e.target.blur === "function") {
            e.target.blur();
        }
        setIsOpen(true);
    };
    return (React.createElement(Button, { variant: "transparent", onClick: handleOpen, className: "flex !p-[6.5px]" },
        React.createElement(MagnifyingGlass, { className: "text-medusa-fg-subtle" })));
};
