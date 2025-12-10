import clsx from "clsx";
import React from "react";
import { Kbd } from "../../..";
export const SearchFooter = () => {
    return (React.createElement("div", { className: clsx("py-docs_0.75 hidden md:flex items-center justify-end px-docs_1", "border-medusa-border-base border-t", "bg-medusa-bg-field z-10") },
        React.createElement("div", { className: "flex items-center gap-docs_0.75" },
            React.createElement("div", { className: "flex items-center gap-docs_0.5" },
                React.createElement("span", { className: clsx("text-medusa-fg-subtle", "text-compact-x-small-plus") }, "Navigation"),
                React.createElement("span", { className: "gap-[5px] flex" },
                    React.createElement(Kbd, { className: clsx("!bg-medusa-bg-field-component !border-medusa-border-strong", "!text-medusa-fg-subtle h-[18px] w-[18px] p-0") }, "\u2191"),
                    React.createElement(Kbd, { className: clsx("!bg-medusa-bg-field-component !border-medusa-border-strong", "!text-medusa-fg-subtle h-[18px] w-[18px] p-0") }, "\u2193"))),
            React.createElement("div", { className: clsx("h-docs_0.75 w-px bg-medusa-border-strong") }),
            React.createElement("div", { className: "flex items-center gap-docs_0.5" },
                React.createElement("span", { className: clsx("text-medusa-fg-subtle", "text-compact-x-small-plus") }, "Open Result"),
                React.createElement(Kbd, { className: clsx("!bg-medusa-bg-field-component !border-medusa-border-strong", "!text-medusa-fg-subtle h-[18px] w-[18px] p-0") }, "\u21B5")))));
};
