"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCollapsible = void 0;
const react_1 = __importStar(require("react"));
// @ts-expect-error can't install the types package because it doesn't support React v19
const react_transition_group_1 = require("react-transition-group");
const useCollapsible = ({ initialValue = true, heightAnimation = false, translateEnabled = true, onClose, unmountOnExit = true, childrenRef, useChild = true, }) => {
    const [collapsed, setCollapsed] = (0, react_1.useState)(initialValue);
    const getNodeFromChildrenRef = () => {
        if (!useChild) {
            return childrenRef?.current;
        }
        return (childrenRef?.current?.firstElementChild ||
            childrenRef?.current);
    };
    const getCollapsibleElms = (children) => {
        return (react_1.default.createElement(react_transition_group_1.CSSTransition, { unmountOnExit: unmountOnExit, in: !collapsed, timeout: 150, nodeRef: childrenRef, onEnter: () => {
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
exports.useCollapsible = useCollapsible;
