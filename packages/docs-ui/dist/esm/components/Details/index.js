"use client";
import React, { Suspense, cloneElement, useRef, useState } from "react";
import { Loading } from "../../components";
import clsx from "clsx";
import { DetailsSummary } from "./Summary";
import { useCollapsible } from "../../hooks";
export const Details = ({ openInitial = false, summaryContent, summaryElm, children, heightAnimation = false, ...props }) => {
    const [open, setOpen] = useState(openInitial);
    const ref = useRef(null);
    const childrenWrapperRef = useRef(null);
    const { getCollapsibleElms, setCollapsed } = useCollapsible({
        initialValue: !openInitial,
        heightAnimation,
        onClose: () => setOpen(false),
        childrenRef: childrenWrapperRef,
    });
    const handleToggle = (e) => {
        const targetElm = e.target;
        if (targetElm.tagName.toLowerCase() === "a") {
            window.location.href =
                targetElm.getAttribute("href") || window.location.href;
            return;
        }
        if (targetElm.tagName.toLowerCase() === "code") {
            return;
        }
        if (open) {
            setCollapsed(true);
        }
        else {
            setOpen(true);
            setCollapsed(false);
        }
    };
    return (React.createElement("details", { ...props, ref: ref, open: open, onClick: (event) => {
            event.preventDefault();
        }, onToggle: (event) => {
            // this is to avoid event propagation
            // when details are nested, which is a bug
            // in react. Learn more here:
            // https://github.com/facebook/react/issues/22718
            event.stopPropagation();
        }, className: clsx("border-medusa-border-base border-y border-solid border-x-0", "overflow-hidden [&>summary]:relative", props.className) },
        summaryContent && (React.createElement(DetailsSummary, { open: open, onClick: handleToggle, className: "cursor-pointer", title: summaryContent })),
        summaryElm &&
            cloneElement(summaryElm, {
                open,
                onClick: handleToggle,
            }),
        getCollapsibleElms(React.createElement(Suspense, { fallback: React.createElement(Loading, { className: "!mb-docs_2 !mt-0" }) },
            React.createElement("div", { ref: childrenWrapperRef }, children)))));
};
