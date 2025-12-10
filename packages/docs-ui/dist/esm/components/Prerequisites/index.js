"use client";
import React, { useRef } from "react";
import { Button, useCollapsible } from "../..";
import clsx from "clsx";
import { TriangleRightMini } from "@medusajs/icons";
import { PrerequisiteItem, } from "./Item";
export const Prerequisites = ({ items }) => {
    const itemsRef = useRef(null);
    const { collapsed, getCollapsibleElms, setCollapsed } = useCollapsible({
        initialValue: false,
        translateEnabled: false,
        childrenRef: itemsRef,
        useChild: false,
    });
    const getPosition = (index) => {
        if (items.length === 1) {
            return "alone";
        }
        if (index === items.length - 1) {
            return "bottom";
        }
        return index === 0 ? "top" : "middle";
    };
    return (React.createElement("details", { open: !collapsed, onClick: (event) => {
            if (event.target instanceof HTMLAnchorElement) {
                return;
            }
            event.preventDefault();
        }, onToggle: (event) => {
            // this is to avoid event propagation
            // when details are nested, which is a bug
            // in react. Learn more here:
            // https://github.com/facebook/react/issues/22718
            event.stopPropagation();
        }, className: "my-docs_1" },
        React.createElement("summary", { className: "flex no-marker items-center mb-[6px] w-fit", onClick: () => setCollapsed((prev) => !prev) },
            React.createElement(Button, { className: clsx("flex items-center", "px-docs_0.5 py-docs_0.25", "text-medusa-fg-subtle", "active:!outline-none active:!shadow-none", "focus:!outline-none focus:!shadow-none"), variant: "transparent-clear" },
                React.createElement(TriangleRightMini, { className: clsx("transition-transform", !collapsed && "rotate-90") }),
                React.createElement("span", { className: "text-compact-small-plus block ml-[6px]" }, "Prerequisites"),
                React.createElement("span", { className: "fg-muted text-compact-small" }, items.length))),
        getCollapsibleElms(React.createElement("div", { className: "flex gap-[6px] flex-col", ref: itemsRef }, items.map((item, index) => (React.createElement(PrerequisiteItem, { item: {
                ...item,
                position: getPosition(index),
            }, key: index })))))));
};
