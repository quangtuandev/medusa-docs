"use client";
import clsx from "clsx";
import Link from "next/link";
import React, { useMemo } from "react";
import { TriangleRightMini } from "@medusajs/icons";
export const MainNavMobileSubMenu = ({ menu, title, setSelectedMenus, onOpenLink, }) => {
    const filteredItems = useMemo(() => {
        return menu.filter((item) => item.type === "link" || item.type === "sub-menu");
    }, [menu]);
    return (React.createElement("div", { className: "flex flex-col gap-[23px] max-h-[90%]" },
        React.createElement("span", { className: "text-compact-small-plus text-medusa-fg-muted uppercase" }, title),
        React.createElement("ul", { className: "flex flex-col gap-[18px] max-h-full overflow-auto" }, filteredItems.map((item, index) => (React.createElement("li", { key: index, className: clsx("text-h1 text-medusa-fg-base cursor-pointer", "flex justify-between gap-docs_1") },
            item.type === "link" && (React.createElement(Link, { href: item.link, className: "block w-full", onClick: () => onOpenLink?.() }, item.title)),
            item.type === "sub-menu" && (React.createElement("div", { className: "w-full flex justify-between gap-docs_1", onClick: () => setSelectedMenus((prev) => [
                    ...prev,
                    {
                        title: item.title,
                        menu: item.items,
                    },
                ]) },
                React.createElement("span", null, item.title),
                React.createElement(TriangleRightMini, null)))))))));
};
