import React from "react";
import clsx from "clsx";
import { Kbd } from "../../../Kbd";
import { KapaIcon } from "../../../Icons/Kapa";
import { Tooltip } from "../../../Tooltip";
export const AiAssistantChatWindowFooter = () => {
    return (React.createElement("div", { className: clsx("bg-medusa-bg-component border-t border-medusa-border-base", "flex items-center justify-between gap-docs_0.75 text-compact-x-small", "py-docs_0.75 px-docs_1") },
        React.createElement(Tooltip, { text: "Powered by Kapa.ai" },
            React.createElement("a", { href: "https://kapa.ai", target: "_blank", rel: "noreferrer" },
                React.createElement(KapaIcon, { className: "text-medusa-fg-disabled hover:text-medusa-fg-muted transition-colors" }))),
        React.createElement("div", { className: "flex items-center justify-end gap-docs_0.75" },
            React.createElement("span", { className: "text-medusa-fg-muted" }, "Chat is cleared on refresh"),
            React.createElement("span", { className: "h-docs_0.75 w-px bg-medusa-border-base" }),
            React.createElement("div", { className: "flex items-center gap-docs_0.5" },
                React.createElement("span", { className: "text-medusa-fg-subtle" }, "Line break"),
                React.createElement("div", { className: "flex items-center gap-[5px]" },
                    React.createElement(Kbd, { className: "bg-medusa-bg-field-component border-medusa-border-strong w-[18px] h-[18px] inline-block p-0" }, "\u21E7"),
                    React.createElement(Kbd, { className: "bg-medusa-bg-field-component border-medusa-border-strong w-[18px] h-[18px] inline-block p-0" }, "\u21B5"))))));
};
