import React from "react";
import clsx from "clsx";
import { Badge, BorderedIcon, Link } from "../../../../components";
import { ArrowUpRightOnBox, TriangleRightMini } from "@medusajs/icons";
import { useIsExternalLink } from "../../../..";
export const CardDefaultLayout = ({ icon, image, title, text, href, className, contentClassName, iconClassName, children, badge, rightIcon: RightIconComponent, highlightText = [], }) => {
    const isExternal = useIsExternalLink({ href });
    const getHighlightedText = (textToHighlight) => {
        if (!highlightText.length) {
            return textToHighlight;
        }
        const parts = textToHighlight.split(new RegExp(`(${highlightText.join("|")})`, "gi"));
        return parts.map((part, index) => {
            const isHighlighted = highlightText.some((highlight) => {
                return part.toLowerCase() === highlight.toLowerCase();
            });
            return isHighlighted ? (React.createElement("span", { key: index, className: "bg-medusa-tag-blue-bg px-px rounded-s-docs_xxs" }, part)) : (part);
        });
    };
    return (React.createElement("div", { className: clsx("bg-medusa-bg-component w-full rounded-docs_DEFAULT", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "py-docs_0.5 px-docs_0.75 relative", "flex justify-start items-center gap-docs_0.75 transition-shadow", href &&
            "hover:shadow-elevation-card-hover dark:hover:shadow-elevation-card-hover-dark", className) },
        icon && (React.createElement(BorderedIcon, { wrapperClassName: clsx("p-[4.5px] bg-medusa-bg-component-hover", iconClassName), IconComponent: icon })),
        image && (React.createElement(BorderedIcon, { wrapperClassName: clsx("bg-medusa-bg-base", iconClassName), icon: image })),
        React.createElement("div", { className: clsx("flex flex-col flex-1 overflow-auto", contentClassName) },
            title && (React.createElement("div", { className: "text-small-plus text-medusa-fg-base truncate" }, getHighlightedText(title))),
            text && (React.createElement("span", { className: "text-small-plus text-medusa-fg-subtle" }, getHighlightedText(text))),
            children),
        badge && React.createElement(Badge, { ...badge }),
        React.createElement("span", { className: "text-medusa-fg-subtle" },
            RightIconComponent && React.createElement(RightIconComponent, null),
            !RightIconComponent && isExternal && React.createElement(ArrowUpRightOnBox, null),
            !RightIconComponent && !isExternal && React.createElement(TriangleRightMini, null)),
        href && (React.createElement(Link, { href: href, className: "absolute left-0 top-0 h-full w-full rounded", prefetch: false }))));
};
