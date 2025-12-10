"use client";
import React from "react";
import clsx from "clsx";
import { BorderedIcon, Button, ThemeImage, useIsExternalLink, } from "../../../..";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightOnBox, TriangleRightMini, XMark } from "@medusajs/icons";
export const CardLayoutMini = ({ icon, image, themeImage, title, text, href, hrefProps = {}, closeable = false, onClose, className, imageDimensions = { width: 45, height: 36 }, iconClassName, cardRef, }) => {
    const isExternal = useIsExternalLink({ href });
    return (React.createElement("div", { className: clsx("relative rounded-docs_DEFAULT border-medusa-fg-on-inverted border", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "hover:shadow-elevation-card-hover dark:hover:shadow-elevation-card-hover-dark", "bg-medusa-tag-neutral-bg dark:bg-medusa-bg-component", "hover:bg-medusa-tag-neutral-bg-hover dark:hover:bg-medusa-bg-component-hover", "w-fit transition-[shadow,background]", className), ref: cardRef },
        React.createElement("div", { className: clsx("rounded-docs_DEFAULT flex gap-docs_0.75 py-docs_0.25", "pl-docs_0.25 pr-docs_0.75 items-center") },
            icon && (React.createElement(BorderedIcon, { wrapperClassName: clsx("p-[4.5px] bg-medusa-bg-component-hover"), IconComponent: icon })),
            image && (React.createElement(Image, { src: image, className: clsx("shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "rounded-docs_xs", iconClassName), width: imageDimensions.width, height: imageDimensions.height, alt: title || text || "", style: {
                    width: `${imageDimensions.width}px`,
                    height: `${imageDimensions.height}px`,
                } })),
            themeImage && (React.createElement(ThemeImage, { ...themeImage, className: clsx("shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "rounded-docs_xs", iconClassName), width: imageDimensions.width, height: imageDimensions.height, alt: title || text || "", style: {
                    width: `${imageDimensions.width}px`,
                    height: `${imageDimensions.height}px`,
                } })),
            React.createElement("div", { className: "flex flex-col" },
                title && (React.createElement("span", { className: "text-x-small-plus text-medusa-fg-base" }, title)),
                text && (React.createElement("span", { className: "text-x-small-plus text-medusa-fg-subtle" }, text))),
            !closeable && (React.createElement("span", { className: "text-medusa-fg-subtle" }, isExternal ? React.createElement(ArrowUpRightOnBox, null) : React.createElement(TriangleRightMini, null))),
            href && (React.createElement(Link, { href: href, className: "absolute left-0 top-0 w-full h-full z-[1]", prefetch: false, ...hrefProps })),
            closeable && (React.createElement(Button, { variant: "transparent-clear", onClick: onClose, className: "!p-[2.5px] z-[2] hover:!bg-medusa-button-transparent-hover focus:!shadow-none focus:!bg-transparent" },
                React.createElement(XMark, null))))));
};
