import React from "react";
import NextLink from "next/link";
import clsx from "clsx";
import { TriangleRightMini } from "@medusajs/icons";
export const Link = ({ href, children, className, withIcon = false, variant = "default", ...rest }) => {
    if (href?.replace(/#.*$/, "").endsWith("page.mdx")) {
        href = href.replace("/page.mdx", "");
    }
    return (React.createElement(NextLink, { href: href || "", ...rest, className: clsx(variant === "default" &&
            "text-medusa-fg-interactive hover:text-medusa-fg-interactive-hover", variant === "content" && [
            "underline decoration-medusa-fg-muted hover:decoration-medusa-fg-interactive",
            "decoration-[1.5px] font-medium transition-[text-decoration-color]",
        ], withIcon && "flex gap-0.25 items-center group", className) },
        children,
        withIcon && (React.createElement(TriangleRightMini, { className: "group-hover:translate-x-docs_0.125 transition-transform" }))));
};
