"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const Link = ({ href, children, className, withIcon = false, variant = "default", ...rest }) => {
    if (href?.replace(/#.*$/, "").endsWith("page.mdx")) {
        href = href.replace("/page.mdx", "");
    }
    return (react_1.default.createElement(link_1.default, { href: href || "", ...rest, className: (0, clsx_1.default)(variant === "default" &&
            "text-medusa-fg-interactive hover:text-medusa-fg-interactive-hover", variant === "content" && [
            "underline decoration-medusa-fg-muted hover:decoration-medusa-fg-interactive",
            "decoration-[1.5px] font-medium transition-[text-decoration-color]",
        ], withIcon && "flex gap-0.25 items-center group", className) },
        children,
        withIcon && (react_1.default.createElement(icons_1.TriangleRightMini, { className: "group-hover:translate-x-docs_0.125 transition-transform" }))));
};
exports.Link = Link;
