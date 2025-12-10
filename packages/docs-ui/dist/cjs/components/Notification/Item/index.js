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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationItem = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const Default_1 = require("./Layout/Default");
// @ts-expect-error can't install the types package because it doesn't support React v19
const react_transition_group_1 = require("react-transition-group");
const NotificationItem = ({ className = "", placement = "bottom", show = true, layout = "default", setShow, onClose, children, ...rest }) => {
    const ref = (0, react_1.useRef)(null);
    const handleClose = () => {
        setShow?.(false);
        onClose?.();
    };
    return (react_1.default.createElement(react_transition_group_1.CSSTransition, { timeout: 200, classNames: {
            enter: "animate-slideInRight animate-fast",
            exit: "animate-slideOutRight animate-fast",
        }, nodeRef: ref },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("md:max-w-[320px] md:w-[320px] w-full", "fixed md:right-docs_1 left-0 md:m-docs_1", placement === "bottom" && "md:bottom-docs_1 bottom-0", placement === "top" && "md:top-docs_1 top-0", "opacity-100 transition-opacity duration-200 ease-ease", !show && "!opacity-0", className), ref: ref },
            layout === "default" && (react_1.default.createElement(Default_1.NotificationItemLayoutDefault, { ...rest, handleClose: handleClose }, children)),
            layout === "empty" &&
                react_1.Children.map(children, (child) => {
                    if (child) {
                        return react_1.default.cloneElement(child, {
                            onClose: handleClose,
                        });
                    }
                }))));
};
exports.NotificationItem = NotificationItem;
