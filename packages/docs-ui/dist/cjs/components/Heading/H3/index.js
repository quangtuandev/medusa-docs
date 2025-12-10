"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.H3 = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const components_1 = require("../../../components");
const __1 = require("../../..");
const H3 = ({ className, children, ...props }) => {
    const { showCollapsedNavbar } = (0, __1.useLayout)();
    const copyText = (0, __1.useHeadingUrl)({ id: props.id || "" });
    return (react_1.default.createElement("h3", { className: (0, clsx_1.default)("text-h3 [&_code]:!text-h3 [&_code]:!font-mono my-docs_1 text-medusa-fg-base", props.id && [
            "group/h3",
            showCollapsedNavbar && "scroll-m-docs_7",
            !showCollapsedNavbar && "scroll-m-56",
        ], className), ...props },
        children,
        props.id && (react_1.default.createElement(components_1.CopyButton, { text: copyText, className: "opacity-0 group-hover/h3:opacity-100 transition-opacity ml-docs_0.5 inline-block" },
            react_1.default.createElement(components_1.Link, { href: `#${props.id}`, scroll: false }, "#")))));
};
exports.H3 = H3;
