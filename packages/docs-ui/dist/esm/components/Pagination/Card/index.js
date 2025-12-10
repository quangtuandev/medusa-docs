import { TriangleLeftMini, TriangleRightMini } from "@medusajs/icons";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
export const PaginationCard = ({ type, title, parentTitle, link, className, }) => {
    return (React.createElement("div", { className: clsx("relative flex-1", "py-docs_0.5 px-docs_0.75 rounded", "bg-medusa-bg-component hover:bg-medusa-bg-component-hover", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "hover:shadow-elevation-card-hover dark:shadow-elevation-card-hover-dark", className) },
        React.createElement(Link, { href: link, className: "absolute top-0 left-0 w-full h-full" }),
        React.createElement("div", { className: clsx("h-[40px] flex gap-docs_0.75 items-center") },
            type === "previous" && (React.createElement(TriangleLeftMini, { className: "text-medusa-fg-muted" })),
            React.createElement("div", { className: clsx("flex-1", type === "previous" && "text-left", type === "next" && "text-right") },
                parentTitle && (React.createElement("span", { className: "block text-compact-small text-medusa-fg-subtle" }, parentTitle)),
                React.createElement("span", { className: "block text-compact-small-plus text-medusa-fg-base" }, title)),
            type === "next" && (React.createElement(TriangleRightMini, { className: "text-medusa-fg-muted" })))));
};
