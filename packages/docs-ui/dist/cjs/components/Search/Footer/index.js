"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchFooter = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const __1 = require("../../..");
const SearchFooter = () => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("py-docs_0.75 hidden md:flex items-center justify-end px-docs_1", "border-medusa-border-base border-t", "bg-medusa-bg-field z-10") },
        react_1.default.createElement("div", { className: "flex items-center gap-docs_0.75" },
            react_1.default.createElement("div", { className: "flex items-center gap-docs_0.5" },
                react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-subtle", "text-compact-x-small-plus") }, "Navigation"),
                react_1.default.createElement("span", { className: "gap-[5px] flex" },
                    react_1.default.createElement(__1.Kbd, { className: (0, clsx_1.default)("!bg-medusa-bg-field-component !border-medusa-border-strong", "!text-medusa-fg-subtle h-[18px] w-[18px] p-0") }, "\u2191"),
                    react_1.default.createElement(__1.Kbd, { className: (0, clsx_1.default)("!bg-medusa-bg-field-component !border-medusa-border-strong", "!text-medusa-fg-subtle h-[18px] w-[18px] p-0") }, "\u2193"))),
            react_1.default.createElement("div", { className: (0, clsx_1.default)("h-docs_0.75 w-px bg-medusa-border-strong") }),
            react_1.default.createElement("div", { className: "flex items-center gap-docs_0.5" },
                react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-subtle", "text-compact-x-small-plus") }, "Open Result"),
                react_1.default.createElement(__1.Kbd, { className: (0, clsx_1.default)("!bg-medusa-bg-field-component !border-medusa-border-strong", "!text-medusa-fg-subtle h-[18px] w-[18px] p-0") }, "\u21B5")))));
};
exports.SearchFooter = SearchFooter;
