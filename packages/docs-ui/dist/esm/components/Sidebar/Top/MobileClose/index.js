"use client";
import React from "react";
import { Button, useSidebar } from "../../../..";
import { XMarkMini } from "@medusajs/icons";
export const SidebarTopMobileClose = () => {
    const { setMobileSidebarOpen } = useSidebar();
    return (React.createElement("div", { className: "m-docs_0.75 lg:hidden" },
        React.createElement(Button, { variant: "transparent-clear", onClick: () => setMobileSidebarOpen(false), className: "!p-0 hover:!bg-transparent" },
            React.createElement(XMarkMini, { className: "text-medusa-fg-subtle" }))));
};
