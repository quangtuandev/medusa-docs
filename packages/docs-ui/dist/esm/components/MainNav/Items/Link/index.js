"use client";
import React from "react";
import { LinkButton } from "../../../..";
import clsx from "clsx";
export const MainNavItemLink = ({ item, isActive, icon, className, }) => {
    return (React.createElement(LinkButton, { href: item.link, className: clsx(isActive && "text-medusa-fg-base", !isActive && "text-medusa-fg-muted hover:text-medusa-fg-subtle", className) },
        item.title,
        icon));
};
