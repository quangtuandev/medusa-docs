"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInput = void 0;
const icons_1 = require("@medusajs/icons");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const hooks_1 = require("../../../hooks");
const Kbd_1 = require("../../Kbd");
const SearchInput = ({ value, onChange, className, placeholder = "Search...", ...props }) => {
    (0, hooks_1.useKeyboardShortcut)({
        metakey: false,
        shortcutKeys: ["escape"],
        action: () => onChange(""),
        checkEditing: false,
        preventDefault: true,
    });
    return (react_1.default.createElement("div", { className: "flex flex-col gap-docs_0.5" },
        react_1.default.createElement("div", { className: "relative" },
            react_1.default.createElement(icons_1.MagnifyingGlass, { className: "absolute left-docs_0.5 top-[8.5px] bottom-[8.5px] text-medusa-fg-muted" }),
            react_1.default.createElement("input", { type: "text", placeholder: placeholder, className: (0, clsx_1.default)("w-full h-docs_2 pl-docs_2 text-base md:text-compact-small placeholder:text-medusa-fg-muted", "bg-medusa-bg-field text-medusa-fg-base rounded-full", "shadow-borders-base hover:bg-medusa-bg-field-hover", "focus:bg-medusa-bg-field focus:shadow-borders-interactive-with-active focus:outline-none", className), value: value, onChange: (e) => onChange(e.target.value), ...props }),
            value && (react_1.default.createElement("button", { className: (0, clsx_1.default)("absolute right-docs_0.5 top-[8.5px] bottom-[8.5px] appearance-none", "flex items-center justify-center"), onClick: () => onChange("") },
                react_1.default.createElement(icons_1.XMark, { className: "text-medusa-fg-muted" })))),
        react_1.default.createElement("span", { className: "flex gap-docs_0.25 justify-end items-center text-compact-x-small" },
            react_1.default.createElement(Kbd_1.Kbd, { variant: "small" }, "esc"),
            react_1.default.createElement("span", { className: "text-medusa-fg-muted" }, "Clear Search"))));
};
exports.SearchInput = SearchInput;
