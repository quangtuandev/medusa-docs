"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kbd = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const Kbd = ({ children, className, variant = "default", ...props }) => {
    return (react_1.default.createElement("kbd", { className: (0, clsx_1.default)("rounded-docs_xs border-solid border border-medusa-border-base", "inline-flex items-center justify-center", "px-docs_0.25", "bg-medusa-bg-field", "text-medusa-fg-base", "font-base shadow-none", variant === "small"
            ? "text-compact-x-small"
            : "text-compact-x-small-plus", className), ...props }, children));
};
exports.Kbd = Kbd;
