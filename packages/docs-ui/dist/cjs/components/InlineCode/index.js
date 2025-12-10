"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineCode = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../components");
const InlineCode = ({ variant = "default", ...props }) => {
    return (react_1.default.createElement(components_1.CopyButton, { text: props.children, buttonClassName: (0, clsx_1.default)("bg-transparent border-0 p-0 inline text-medusa-fg-subtle group", "font-monospace") },
        react_1.default.createElement("code", { ...props, className: (0, clsx_1.default)("text-medusa-tag-neutral-text border whitespace-break-spaces", "font-monospace text-code-label rounded-docs_sm py-0 px-[5px]", variant === "default" && [
                "bg-medusa-tag-neutral-bg group-hover:bg-medusa-tag-neutral-bg-hover",
                "group-active:bg-medusa-bg-subtle-pressed group-focus:bg-medusa-bg-subtle-pressed",
                "border-medusa-tag-neutral-border",
            ], variant === "grey-bg" && [
                "bg-medusa-bg-switch-off group-hover:bg-medusa-bg-switch-off-hover",
                "group-active:bg-medusa-bg-switch-off-hover group-focus:bg-medusa-switch-off-hover",
                "border-medusa-border-strong",
            ], props.className) })));
};
exports.InlineCode = InlineCode;
