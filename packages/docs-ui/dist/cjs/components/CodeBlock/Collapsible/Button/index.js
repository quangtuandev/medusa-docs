"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlockCollapsibleButton = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const ui_1 = require("@medusajs/ui");
const CodeBlockCollapsibleButton = ({ type, expandButtonLabel = "Show more", collapsed, setCollapsed, className, }) => {
    if (!collapsed) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        type === "start" && (react_1.default.createElement(ui_1.Button, { className: (0, clsx_1.default)("font-base w-full !p-docs_0.5 !shadow-none z-10", "bg-medusa-contrast-button hover:bg-medusa-contrast-button-hover", "txt-compact-xsmall text-medusa-contrast-fg-secondary", type === "start" && "rounded-t-docs_DEFAULT rounded-b-none", className), onClick: () => setCollapsed(false) }, expandButtonLabel)),
        type === "end" && (react_1.default.createElement(ui_1.Button, { className: (0, clsx_1.default)("font-base w-full !p-docs_0.5 !shadow-none z-10", "bg-medusa-contrast-button hover:bg-medusa-contrast-button-hover", "txt-compact-xsmall text-medusa-contrast-fg-secondary", "rounded-t-none rounded-b-docs_DEFAULT", className), onClick: () => setCollapsed(false) }, expandButtonLabel))));
};
exports.CodeBlockCollapsibleButton = CodeBlockCollapsibleButton;
