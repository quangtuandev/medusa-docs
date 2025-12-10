"use client";
import React, { useRef, useState } from "react";
import { Button } from "../../Button";
import { ArrowUturnLeft, BarsThree, XMark } from "@medusajs/icons";
import clsx from "clsx";
// @ts-expect-error can't install the types package because it doesn't support React v19
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { MainNavMobileMainMenu } from "./Main";
import { MainNavMobileSubMenu } from "./SubMenu";
export const MainNavMobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMenus, setSelectedMenus] = useState([]);
    const ref = useRef(null);
    const handleOpenLink = () => {
        setIsOpen(false);
    };
    return (React.createElement("div", { className: "flex lg:hidden justify-center items-center" },
        React.createElement(Button, { variant: "transparent", onClick: () => setIsOpen((prev) => !prev), className: "text-medusa-fg-subtle !p-[6.5px]" },
            !isOpen && React.createElement(BarsThree, null),
            isOpen && React.createElement(XMark, null)),
        React.createElement("div", { className: clsx("flex items-center justify-center fixed w-full h-[calc(100vh-52px)]", "top-[52px] transition-[left] bg-medusa-bg-subtle z-50", !isOpen && "-left-full", isOpen && "left-0") },
            React.createElement(SwitchTransition, null,
                React.createElement(CSSTransition, { key: !selectedMenus.length
                        ? "main"
                        : selectedMenus[selectedMenus.length - 1].title, classNames: {
                        enter: "animate-fadeInLeft animate-fast",
                        exit: "animate-fadeOutRight animate-fast",
                    }, nodeRef: ref, timeout: 250 },
                    React.createElement("div", { ref: ref, className: "w-full px-docs_1.5 h-3/4 flex flex-col justify-center" },
                        selectedMenus.length === 0 && (React.createElement(MainNavMobileMainMenu, { setSelectedMenus: setSelectedMenus, onOpenLink: handleOpenLink })),
                        selectedMenus.length > 0 && (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: clsx("flex items-center gap-docs_0.5", "text-medusa-fg-base my-[14px]", "cursor-pointer"), tabIndex: -1, onClick: () => setSelectedMenus((prev) => {
                                    const temp = [...prev];
                                    temp.pop();
                                    return temp;
                                }) },
                                React.createElement(ArrowUturnLeft, null),
                                React.createElement("span", { className: "text-h1" }, "Back")),
                            React.createElement(MainNavMobileSubMenu, { ...selectedMenus[selectedMenus.length - 1], setSelectedMenus: setSelectedMenus, onOpenLink: handleOpenLink })))))))));
};
