"use client";
import clsx from "clsx";
import React from "react";
import { CopyButton, Link } from "../../../components";
import { useHeadingUrl, useLayout } from "../../..";
export const H3 = ({ className, children, ...props }) => {
    const { showCollapsedNavbar } = useLayout();
    const copyText = useHeadingUrl({ id: props.id || "" });
    return (React.createElement("h3", { className: clsx("text-h3 [&_code]:!text-h3 [&_code]:!font-mono my-docs_1 text-medusa-fg-base", props.id && [
            "group/h3",
            showCollapsedNavbar && "scroll-m-docs_7",
            !showCollapsedNavbar && "scroll-m-56",
        ], className), ...props },
        children,
        props.id && (React.createElement(CopyButton, { text: copyText, className: "opacity-0 group-hover/h3:opacity-100 transition-opacity ml-docs_0.5 inline-block" },
            React.createElement(Link, { href: `#${props.id}`, scroll: false }, "#")))));
};
