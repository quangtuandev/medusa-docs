"use client";
import clsx from "clsx";
import React from "react";
export const MenuAction = ({ item, onClick }) => {
    return (React.createElement("div", { className: "px-docs_0.25" },
        React.createElement("span", { className: clsx("flex py-docs_0.25 px-docs_0.5", "gap-docs_0.5 rounded-docs_xs", "hover:bg-medusa-bg-component-hover", "text-medusa-fg-base cursor-pointer"), tabIndex: -1, onClick: () => {
                item.action();
                onClick?.(item);
            } },
            React.createElement("span", { className: "text-medusa-fg-subtle mt-[2.5px] block" }, item.icon),
            React.createElement("span", { className: "text-compact-small flex-1" }, item.title),
            item.shortcut && (React.createElement("span", { className: "text-medusa-fg-subtle text-compact-small" }, item.shortcut)))));
};
