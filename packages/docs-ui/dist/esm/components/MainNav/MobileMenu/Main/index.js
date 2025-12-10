"use client";
import React from "react";
import { useMainNav } from "../../../../providers";
import Link from "next/link";
import { TriangleRightMini } from "@medusajs/icons";
import clsx from "clsx";
export const MainNavMobileMainMenu = ({ setSelectedMenus: setSelectedMenu, onOpenLink, }) => {
    const { navItems } = useMainNav();
    return (React.createElement("div", { className: "flex flex-col gap-[23px]" },
        React.createElement("span", { className: "text-compact-small-plus text-medusa-fg-muted uppercase" }, "Menu"),
        React.createElement("ul", { className: "flex flex-col gap-[18px]" }, navItems.map((item, index) => (React.createElement("li", { key: index, className: clsx("text-h1 text-medusa-fg-base cursor-pointer", "flex justify-between gap-docs_1"), onClick: () => {
                if (item.type !== "dropdown") {
                    return;
                }
                setSelectedMenu((prev) => [
                    ...prev,
                    {
                        title: item.title,
                        menu: item.children,
                    },
                ]);
            } },
            item.type === "link" && (React.createElement(Link, { href: item.link, className: "block w-full", onClick: () => onOpenLink?.() }, item.title)),
            item.type === "dropdown" && (React.createElement(React.Fragment, null,
                React.createElement("span", null, item.title),
                React.createElement(TriangleRightMini, null)))))))));
};
