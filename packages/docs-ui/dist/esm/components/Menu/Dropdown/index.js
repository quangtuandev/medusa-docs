"use client";
import React from "react";
import { useRef, useState } from "react";
import { Button, Menu, useClickOutside } from "../../..";
import clsx from "clsx";
export const DropdownMenu = ({ dropdownButtonContent, dropdownButtonClassName, menuComponent, menuItems, menuClassName, className, open: externalOpen = false, setOpen: externalSetOpen, }) => {
    const [open, setOpen] = useState(externalOpen);
    const ref = useRef(null);
    function changeOpenState(newOpenState) {
        if (externalSetOpen) {
            externalSetOpen(newOpenState);
        }
        else {
            setOpen(newOpenState);
        }
    }
    useClickOutside({
        elmRef: ref,
        onClickOutside: () => {
            changeOpenState(false);
        },
    });
    if (!menuComponent && !menuItems) {
        return null;
    }
    return (React.createElement("div", { className: clsx("relative", className) },
        React.createElement(Button, { variant: "transparent", onClick: () => changeOpenState(!open), className: clsx("!p-[6px] text-medusa-fg-subtle", dropdownButtonClassName), buttonRef: ref }, dropdownButtonContent),
        menuComponent,
        !menuComponent && menuItems && (React.createElement(Menu, { items: menuItems, className: clsx("absolute right-0 top-[calc(100%+8px)] w-max", !open && "hidden", menuClassName) }))));
};
