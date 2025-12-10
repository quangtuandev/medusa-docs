"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardFillerLayout = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const link_1 = __importDefault(require("next/link"));
const CardFillerLayout = ({ text, href, className }) => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex justify-center items-center w-full", "gap-docs_0.75 px-docs_0.75 py-docs_0.5 rounded-docs_DEFAULT", "border border-dashed border-medusa-border-strong", "bg-medusa-bg-component text-medusa-fg-subtle", className) },
        react_1.default.createElement("div", null,
            react_1.default.createElement("span", { className: "text-compact-small" }, text),
            href && (react_1.default.createElement(react_1.default.Fragment, null,
                " ",
                react_1.default.createElement(link_1.default, { href: href, className: "text-compact-small-plus" }, "Show All\u2197"))))));
};
exports.CardFillerLayout = CardFillerLayout;
