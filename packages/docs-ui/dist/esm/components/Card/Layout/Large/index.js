import React from "react";
import { useIsExternalLink } from "../../../..";
import clsx from "clsx";
import { ArrowUpRightOnBox, TriangleRightMini } from "@medusajs/icons";
import Link from "next/link";
export const CardLargeLayout = ({ title, text, image, icon, href, className, }) => {
    const isExternal = useIsExternalLink({ href });
    const IconComponent = icon;
    return (React.createElement("div", { className: clsx("relative flex flex-col gap-docs_0.75", "justify-start group", className) },
        React.createElement("div", { className: clsx("rounded-docs_DEFAULT bg-medusa-bg-component w-[290px] h-[144px]", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", href &&
                "group-hover:shadow-elevation-card-hover group-hover:dark:shadow-elevation-card-hover-dark", "px-docs_0.75 py-docs_0.5 flex justify-center items-center w-full") },
            IconComponent && (React.createElement(IconComponent, { className: "text-medusa-fg-subtle", width: 32, height: 32, viewBox: "0 0 32 32" })),
            image && (React.createElement("img", { src: image, alt: title || text || "", className: "w-[144px]" }))),
        React.createElement("div", { className: "flex flex-col" },
            React.createElement("div", { className: "flex gap-docs_0.25 items-center text-medusa-fg-base" },
                title && React.createElement("span", { className: "text-compact-small-plus" }, title),
                href && isExternal && React.createElement(ArrowUpRightOnBox, null),
                href && !isExternal && (React.createElement(TriangleRightMini, { className: "group-hover:translate-x-docs_0.125 transition-transform" }))),
            text && (React.createElement("span", { className: "text-small-plus text-medusa-fg-subtle" }, text))),
        href && (React.createElement(Link, { href: href, className: "absolute left-0 top-0 h-full w-full rounded", prefetch: false }))));
};
