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
exports.Modal = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const providers_1 = require("../../providers");
const Header_1 = require("./Header");
const Footer_1 = require("./Footer");
const use_keyboard_shortcut_1 = require("../../hooks/use-keyboard-shortcut");
const Modal = ({ className, title, actions, children, contentClassName, modalContainerClassName, onClose, open = true, footerContent, passedRef, ...props }) => {
    const { closeModal } = (0, providers_1.useModal)();
    const ref = (0, react_1.useRef)(null);
    const setRefs = (0, react_1.useCallback)((node) => {
        // Ref's from useRef needs to have the node assigned to `current`
        ref.current = node;
        if (typeof passedRef === "function") {
            passedRef(node);
        }
        else if (passedRef && "current" in passedRef) {
            passedRef.current = node;
        }
    }, [passedRef]);
    (0, use_keyboard_shortcut_1.useKeyboardShortcut)({
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
    (0, react_1.useEffect)(() => {
        if (open) {
            document.body.setAttribute("data-modal", "opened");
        }
        else {
            document.body.removeAttribute("data-modal");
        }
    }, [open]);
    return (react_1.default.createElement("dialog", { ...props, className: (0, clsx_1.default)("fixed top-0 left-0 flex h-screen w-screen items-center justify-center", "bg-medusa-bg-overlay z-50", "hidden open:flex border-0 px-docs_0.5 lg:p-0", className), onClick: handleClick, ref: setRefs, onClose: handleClose, open: open },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("bg-medusa-bg-base rounded-docs_lg", "shadow-elevation-modal dark:shadow-elevation-modal-dark", "max-w-full sm:max-w-modal-sm md:max-w-modal-md lg:max-w-modal-lg", "h-auto w-full", modalContainerClassName) },
            title && react_1.default.createElement(Header_1.ModalHeader, { title: title }),
            react_1.default.createElement("div", { className: (0, clsx_1.default)("overflow-auto py-docs_1.5 px-docs_2 rounded-docs_lg", contentClassName) }, children),
            actions && actions?.length > 0 && react_1.default.createElement(Footer_1.ModalFooter, { actions: actions }),
            footerContent && react_1.default.createElement(Footer_1.ModalFooter, null, footerContent))));
};
exports.Modal = Modal;
