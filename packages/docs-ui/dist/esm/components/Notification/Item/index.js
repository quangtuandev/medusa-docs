"use client";
import clsx from "clsx";
import React, { Children, useRef } from "react";
import { NotificationItemLayoutDefault } from "./Layout/Default";
// @ts-expect-error can't install the types package because it doesn't support React v19
import { CSSTransition } from "react-transition-group";
export const NotificationItem = ({ className = "", placement = "bottom", show = true, layout = "default", setShow, onClose, children, ...rest }) => {
    const ref = useRef(null);
    const handleClose = () => {
        setShow?.(false);
        onClose?.();
    };
    return (React.createElement(CSSTransition, { timeout: 200, classNames: {
            enter: "animate-slideInRight animate-fast",
            exit: "animate-slideOutRight animate-fast",
        }, nodeRef: ref },
        React.createElement("div", { className: clsx("md:max-w-[320px] md:w-[320px] w-full", "fixed md:right-docs_1 left-0 md:m-docs_1", placement === "bottom" && "md:bottom-docs_1 bottom-0", placement === "top" && "md:top-docs_1 top-0", "opacity-100 transition-opacity duration-200 ease-ease", !show && "!opacity-0", className), ref: ref },
            layout === "default" && (React.createElement(NotificationItemLayoutDefault, { ...rest, handleClose: handleClose }, children)),
            layout === "empty" &&
                Children.map(children, (child) => {
                    if (child) {
                        return React.cloneElement(child, {
                            onClose: handleClose,
                        });
                    }
                }))));
};
