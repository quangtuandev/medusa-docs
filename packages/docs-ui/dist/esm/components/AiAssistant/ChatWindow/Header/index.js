"use client";
import clsx from "clsx";
import React from "react";
import { Tooltip } from "../../../Tooltip";
import { Link } from "../../../Link";
import { ShieldCheck, XMark } from "@medusajs/icons";
import { Button } from "../../../Button";
import { useAiAssistant } from "../../../../providers";
export const AiAssistantChatWindowHeader = () => {
    const { setChatOpened } = useAiAssistant();
    return (React.createElement("div", { className: clsx("flex gap-docs_0.5 items-center justify-between", "w-full px-docs_1 py-docs_0.75 rounded-t-docs_sm", "border-medusa-border-base border-b") },
        React.createElement("div", { className: "flex gap-[6px] items-center" },
            React.createElement("span", { className: "text-h3 text-medusa-fg-base" }, "Ask Anything"),
            React.createElement(Tooltip, { tooltipChildren: React.createElement(React.Fragment, null,
                    "This site is protected by reCAPTCHA and",
                    React.createElement("br", null),
                    "the",
                    " ",
                    React.createElement(Link, { href: "https://policies.google.com/privacy" }, "Google Privacy Policy"),
                    " ",
                    "and ",
                    React.createElement(Link, { href: "https://policies.google.com/terms" }, "ToS"),
                    " ",
                    "apply"), clickable: true, tooltipClassName: "!text-compact-small-plus" },
                React.createElement(ShieldCheck, { className: "text-medusa-fg-muted" }))),
        React.createElement(Button, { variant: "transparent-clear", className: "!p-[6.5px] rounded-docs_sm", onClick: () => setChatOpened(false) },
            React.createElement(XMark, { className: "text-medusa-fg-muted", height: 15, width: 15 }))));
};
