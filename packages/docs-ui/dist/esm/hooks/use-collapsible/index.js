"use client";
import React, { useState } from "react";
// @ts-expect-error can't install the types package because it doesn't support React v19
import { CSSTransition } from "react-transition-group";
export const useCollapsible = ({ initialValue = true, heightAnimation = false, translateEnabled = true, onClose, unmountOnExit = true, childrenRef, useChild = true, }) => {
    const [collapsed, setCollapsed] = useState(initialValue);
    const getNodeFromChildrenRef = () => {
        if (!useChild) {
            return childrenRef?.current;
        }
        return (childrenRef?.current?.firstElementChild ||
            childrenRef?.current);
    };
    const getCollapsibleElms = (children) => {
        return (React.createElement(CSSTransition, { unmountOnExit: unmountOnExit, in: !collapsed, timeout: 150, nodeRef: childrenRef, onEnter: () => {
                const node = getNodeFromChildrenRef();
                if (!node) {
                    return;
                }
                if (heightAnimation) {
                    node.classList.add("transition-[height]");
                    node.style.height = `0px`;
                }
                else {
                    node.classList.add("!mb-docs_2", "!mt-0");
                    if (translateEnabled) {
                        node.classList.add("translate-y-docs_1", "transition-transform");
                    }
                }
            }, onEntering: () => {
                const node = getNodeFromChildrenRef();
                if (!node) {
                    return;
                }
                if (heightAnimation) {
                    node.style.height = `${node.scrollHeight}px`;
                }
            }, onEntered: () => {
                const node = getNodeFromChildrenRef();
                if (!node) {
                    return;
                }
                if (heightAnimation) {
                    node.style.height = `auto`;
                }
            }, onExit: () => {
                const node = getNodeFromChildrenRef();
                if (!node) {
                    return;
                }
                if (heightAnimation) {
                    node.style.height = `${node.scrollHeight}px`;
                }
                else {
                    if (translateEnabled) {
                        node.classList.add("transition-transform", "!-translate-y-docs_1");
                    }
                    setTimeout(() => {
                        onClose?.();
                    }, 100);
                }
            }, onExiting: () => {
                const node = getNodeFromChildrenRef();
                if (!node) {
                    return;
                }
                if (heightAnimation) {
                    node.style.height = `0px`;
                    setTimeout(() => {
                        onClose?.();
                    }, 100);
                }
            } }, children));
    };
    return {
        getCollapsibleElms,
        collapsed,
        setCollapsed,
    };
};
