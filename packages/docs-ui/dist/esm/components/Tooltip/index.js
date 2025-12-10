"use client";
import React, { forwardRef, useId } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import clsx from "clsx";
import "react-tooltip/dist/react-tooltip.css";
export const Tooltip = forwardRef(function Tooltip({ text = "", tooltipClassName = "", children, html = "", tooltipChildren, className, innerClassName, ...tooltipProps }, ref) {
    const elementId = useId();
    return (React.createElement("span", { className: clsx(className, "notranslate"), translate: "no", ref: ref },
        React.createElement("span", { id: elementId, "data-tooltip-content": text, "data-tooltip-html": html, "data-tooltip-id": elementId, className: innerClassName }, children),
        React.createElement(ReactTooltip, { anchorId: elementId, 
            // anchorSelect={elementId ? `#${elementId}` : undefined}
            className: clsx("!text-compact-x-small !shadow-elevation-tooltip dark:!shadow-elevation-tooltip-dark !rounded-docs_DEFAULT", "!py-docs_0.25 !z-[399] hidden !px-docs_0.5 lg:block", "!bg-medusa-bg-component", "!text-medusa-fg-base text-center", tooltipClassName), wrapper: "span", noArrow: true, positionStrategy: "fixed", opacity: 1, ...tooltipProps }, tooltipChildren)));
});
