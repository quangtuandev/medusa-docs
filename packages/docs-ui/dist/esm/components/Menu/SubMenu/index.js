"use client";
import React, { useState } from "react";
import { Menu } from "..";
import clsx from "clsx";
import { TriangleRightMini } from "@medusajs/icons";
import Link from "next/link";
export const MenuSubMenu = ({ item, itemsOnClick }) => {
    const [open, setOpen] = useState(false);
    const Component = item.link ? Link : "span";
    return (React.createElement("div", { className: "px-docs_0.25 relative", onMouseOver: () => setOpen(true), onMouseLeave: () => setOpen(false) },
        React.createElement(Component, { className: clsx("flex py-docs_0.25 px-docs_0.5", "gap-docs_0.5 rounded-docs_xs", "hover:bg-medusa-bg-component-hover", "text-medusa-fg-base justify-between"), onClick: () => itemsOnClick?.(item), href: item.link || "#" },
            React.createElement("span", { className: "text-compact-small" }, item.title),
            React.createElement("span", { className: "text-medusa-fg-subtle mt-[2.5px] block" },
                React.createElement(TriangleRightMini, null))),
        open && (React.createElement("div", { className: "absolute top-0 left-[calc(100%-8px)] w-max" },
            React.createElement(Menu, { itemsOnClick: itemsOnClick, items: item.items })))));
};
