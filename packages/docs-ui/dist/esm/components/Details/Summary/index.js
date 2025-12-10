import React from "react";
import clsx from "clsx";
import { PlusMini } from "@medusajs/icons";
export const DetailsSummary = ({ title, subtitle, children, badge, expandable = true, open = false, className, titleClassName, hideExpandableIcon = false, summaryRef, ...rest }) => {
    return (React.createElement("summary", { className: clsx("py-docs_0.75 flex items-center justify-between", expandable && "cursor-pointer", !expandable &&
            "border-medusa-border-base border-y border-solid border-x-0", (expandable || badge !== undefined) && "gap-0.5", "no-marker", className), ref: summaryRef, ...rest },
        React.createElement("span", { className: "gap-docs_0.25 flex flex-col" },
            React.createElement("span", { className: clsx("text-compact-medium-plus text-medusa-fg-base", titleClassName) }, title || children),
            subtitle && (React.createElement("span", { className: "text-compact-medium text-medusa-fg-subtle mt-0.5" }, subtitle))),
        (badge || expandable) && (React.createElement("span", { className: "flex gap-docs_0.5" },
            badge,
            expandable && !hideExpandableIcon && (React.createElement(PlusMini, { className: clsx("transition-transform", open && "rotate-45") }))))));
};
