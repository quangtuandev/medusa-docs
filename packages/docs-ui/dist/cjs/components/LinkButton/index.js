"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkButton = void 0;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const clsx_1 = __importDefault(require("clsx"));
const LinkButton = ({ variant = "base", className, ...linkProps }) => {
    return (react_1.default.createElement(link_1.default, { ...linkProps, className: (0, clsx_1.default)(className, "inline-flex justify-center items-center", "gap-docs_0.25 rounded-docs_xs", "text-compact-small-plus disabled:text-medusa-fg-disabled", "focus:shadow-borders-focus no-underline", variant === "base" && [
            "text-medusa-fg-base hover:text-medusa-fg-subtle",
            "focus:text-medusa-fg-base",
        ], variant === "interactive" && [
            "text-medusa-fg-interactive hover:text-medusa-interactive-hover",
            "focus:text-medusa-fg-interactive",
        ], variant === "subtle" && [
            "text-medusa-fg-subtle hover:text-medusa-fg-base",
            "focus:text-medusa-fg-subtle",
        ], variant === "muted" && [
            "text-medusa-fg-muted hover:text-medusa-fg-subtle",
            "focus:text-medusa-fg-muted",
        ]) }));
};
exports.LinkButton = LinkButton;
