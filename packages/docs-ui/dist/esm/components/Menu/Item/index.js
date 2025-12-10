"use client";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
export const MenuItem = ({ item, onClick }) => {
    return (React.createElement("div", { className: "px-docs_0.25" },
        React.createElement(Link, { className: clsx("flex py-docs_0.25 px-docs_0.5", "gap-docs_0.5 rounded-docs_xs", "hover:bg-medusa-bg-component-hover", "text-medusa-fg-base"), href: item.link, onClick: () => onClick?.(item), target: item.openInNewTab ? "_blank" : undefined, rel: item.openInNewTab ? "noopener noreferrer" : undefined },
            item.icon && (React.createElement("span", { className: "text-medusa-fg-subtle mt-[2.5px] block" }, item.icon)),
            React.createElement("span", { className: "text-compact-small" }, item.title))));
};
