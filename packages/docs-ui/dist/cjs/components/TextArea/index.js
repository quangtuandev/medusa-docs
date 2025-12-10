"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextArea = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const TextArea = (props) => {
    return (react_1.default.createElement("textarea", { ...props, className: (0, clsx_1.default)("bg-medusa-bg-field shadow-border-base dark:shadow-border-base-dark", "rounded-docs_sm", "py-[6px] px-docs_0.5 text-medium font-base", "hover:bg-medusa-bg-field-hover", "focus:shadow-medusa-border-interactive-with-focus", "active:shadow-medusa-border-interactive-with-focus", "disabled:bg-medusa-bg-disabled", "disabled:border-medusa-border-base disabled:border disabled:shadow-none", "placeholder:text-medusa-fg-muted", "disabled:placeholder:text-medusa-fg-disabled", props.className) }));
};
exports.TextArea = TextArea;
