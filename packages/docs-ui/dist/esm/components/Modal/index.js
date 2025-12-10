"use client";
import clsx from "clsx";
import React, { useCallback, useEffect, useRef } from "react";
import { useModal } from "../../providers";
import { ModalHeader } from "./Header";
import { ModalFooter } from "./Footer";
import { useKeyboardShortcut } from "../../hooks/use-keyboard-shortcut";
export const Modal = ({ className, title, actions, children, contentClassName, modalContainerClassName, onClose, open = true, footerContent, passedRef, ...props }) => {
    const { closeModal } = useModal();
    const ref = useRef(null);
    const setRefs = useCallback((node) => {
        // Ref's from useRef needs to have the node assigned to `current`
        ref.current = node;
        if (typeof passedRef === "function") {
            passedRef(node);
        }
        else if (passedRef && "current" in passedRef) {
            passedRef.current = node;
        }
    }, [passedRef]);
    useKeyboardShortcut({
        metakey: false,
        checkEditing: false,
        shortcutKeys: ["escape"],
        action: () => {
            if (open) {
                ref.current?.close();
            }
        },
    });
    const handleClick = (e) => {
        // close modal when the user clicks outside the content
        if (e.target === ref.current) {
            closeModal();
            onClose?.(e);
        }
    };
    const handleClose = (e) => {
        onClose?.(e);
        closeModal();
    };
    useEffect(() => {
        if (open) {
            document.body.setAttribute("data-modal", "opened");
        }
        else {
            document.body.removeAttribute("data-modal");
        }
    }, [open]);
    return (React.createElement("dialog", { ...props, className: clsx("fixed top-0 left-0 flex h-screen w-screen items-center justify-center", "bg-medusa-bg-overlay z-50", "hidden open:flex border-0 px-docs_0.5 lg:p-0", className), onClick: handleClick, ref: setRefs, onClose: handleClose, open: open },
        React.createElement("div", { className: clsx("bg-medusa-bg-base rounded-docs_lg", "shadow-elevation-modal dark:shadow-elevation-modal-dark", "max-w-full sm:max-w-modal-sm md:max-w-modal-md lg:max-w-modal-lg", "h-auto w-full", modalContainerClassName) },
            title && React.createElement(ModalHeader, { title: title }),
            React.createElement("div", { className: clsx("overflow-auto py-docs_1.5 px-docs_2 rounded-docs_lg", contentClassName) }, children),
            actions && actions?.length > 0 && React.createElement(ModalFooter, { actions: actions }),
            footerContent && React.createElement(ModalFooter, null, footerContent))));
};
