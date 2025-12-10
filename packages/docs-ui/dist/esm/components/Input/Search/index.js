"use client";
import { MagnifyingGlass, XMark } from "@medusajs/icons";
import clsx from "clsx";
import React from "react";
import { useKeyboardShortcut } from "../../../hooks";
import { Kbd } from "../../Kbd";
export const SearchInput = ({ value, onChange, className, placeholder = "Search...", ...props }) => {
    useKeyboardShortcut({
        metakey: false,
        shortcutKeys: ["escape"],
        action: () => onChange(""),
        checkEditing: false,
        preventDefault: true,
    });
    return (React.createElement("div", { className: "flex flex-col gap-docs_0.5" },
        React.createElement("div", { className: "relative" },
            React.createElement(MagnifyingGlass, { className: "absolute left-docs_0.5 top-[8.5px] bottom-[8.5px] text-medusa-fg-muted" }),
            React.createElement("input", { type: "text", placeholder: placeholder, className: clsx("w-full h-docs_2 pl-docs_2 text-base md:text-compact-small placeholder:text-medusa-fg-muted", "bg-medusa-bg-field text-medusa-fg-base rounded-full", "shadow-borders-base hover:bg-medusa-bg-field-hover", "focus:bg-medusa-bg-field focus:shadow-borders-interactive-with-active focus:outline-none", className), value: value, onChange: (e) => onChange(e.target.value), ...props }),
            value && (React.createElement("button", { className: clsx("absolute right-docs_0.5 top-[8.5px] bottom-[8.5px] appearance-none", "flex items-center justify-center"), onClick: () => onChange("") },
                React.createElement(XMark, { className: "text-medusa-fg-muted" })))),
        React.createElement("span", { className: "flex gap-docs_0.25 justify-end items-center text-compact-x-small" },
            React.createElement(Kbd, { variant: "small" }, "esc"),
            React.createElement("span", { className: "text-medusa-fg-muted" }, "Clear Search"))));
};
