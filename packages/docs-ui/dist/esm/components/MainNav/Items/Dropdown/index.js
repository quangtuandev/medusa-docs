"use client";
import { TriangleDownMini } from "@medusajs/icons";
import clsx from "clsx";
import React, { useRef, useState } from "react";
import { Menu } from "../../../..";
import { MainNavItemLink } from "../Link";
export const MainNavItemDropdown = ({ item, isActive, className, wrapperClassName, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    const getItemContent = () => {
        if (item.link) {
            return (React.createElement(MainNavItemLink, { item: {
                    ...item,
                    link: item.link,
                    type: "link",
                }, isActive: isActive, icon: React.createElement(TriangleDownMini, { className: clsx("transition-transform", isOpen && "rotate-180") }), className: "!flex" }));
        }
        return (React.createElement("div", { className: clsx("cursor-pointer flex gap-docs_0.25 items-center py-docs_0.25", isActive && "text-medusa-fg-base", !isActive && [
                "text-medusa-fg-muted hover:text-medusa-fg-subtle",
                isOpen && "text-medusa-fg-subtle",
            ], className), tabIndex: -1 },
            React.createElement("span", { className: "text-compact-small-plus" }, item.title),
            React.createElement(TriangleDownMini, { className: clsx("transition-transform", isOpen && "rotate-180") })));
    };
    return (React.createElement("div", { className: clsx("relative", wrapperClassName), ref: ref, onMouseOver: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) },
        getItemContent(),
        React.createElement("div", { className: "absolute top-full -left-docs_0.75 pt-docs_0.25" },
            React.createElement(Menu, { className: clsx("min-w-[190px]", !isOpen && "hidden"), items: item.children, itemsOnClick: () => setIsOpen(false) }))));
};
