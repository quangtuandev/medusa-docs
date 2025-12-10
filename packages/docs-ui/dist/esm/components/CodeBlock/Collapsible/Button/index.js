"use client";
import clsx from "clsx";
import React from "react";
import { Button } from "@medusajs/ui";
export const CodeBlockCollapsibleButton = ({ type, expandButtonLabel = "Show more", collapsed, setCollapsed, className, }) => {
    if (!collapsed) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement(React.Fragment, null,
        type === "start" && (React.createElement(Button, { className: clsx("font-base w-full !p-docs_0.5 !shadow-none z-10", "bg-medusa-contrast-button hover:bg-medusa-contrast-button-hover", "txt-compact-xsmall text-medusa-contrast-fg-secondary", type === "start" && "rounded-t-docs_DEFAULT rounded-b-none", className), onClick: () => setCollapsed(false) }, expandButtonLabel)),
        type === "end" && (React.createElement(Button, { className: clsx("font-base w-full !p-docs_0.5 !shadow-none z-10", "bg-medusa-contrast-button hover:bg-medusa-contrast-button-hover", "txt-compact-xsmall text-medusa-contrast-fg-secondary", "rounded-t-none rounded-b-docs_DEFAULT", className), onClick: () => setCollapsed(false) }, expandButtonLabel))));
};
