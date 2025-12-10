"use client";
import React from "react";
import { SidebarChild } from "../Child";
import { SidebarTopMobileClose } from "./MobileClose";
import { DottedSeparator, useSidebar } from "../../..";
import clsx from "clsx";
export const SidebarTop = React.forwardRef(function SidebarTop(props, ref) {
    const { sidebarHistory } = useSidebar();
    return (React.createElement("div", { className: clsx("pt-docs_0.25 sticky top-0 z-[5]", "bg-medusa-bg-base lg:bg-medusa-bg-subtle"), ref: ref },
        React.createElement(SidebarTopMobileClose, null),
        React.createElement("div", null, sidebarHistory.length > 1 && (React.createElement(React.Fragment, null,
            React.createElement(SidebarChild, null),
            React.createElement(DottedSeparator, { wrapperClassName: "!my-0" }))))));
});
