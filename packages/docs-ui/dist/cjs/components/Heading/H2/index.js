"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.H2 = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const components_1 = require("../../../components");
const __1 = require("../../..");
const H2 = ({ className, children, passRef, ...props }) => {
    const { showCollapsedNavbar } = (0, __1.useLayout)();
    const copyText = (0, __1.useHeadingUrl)({
        id: props.id || "",
    });
    return (react_1.default.createElement("h2", { className: (0, clsx_1.default)("text-h2 [&_code]:!text-h2 [&_code]:!font-mono mb-docs_1 mt-docs_2 text-medusa-fg-base", props.id && [
            "group/h2",
            showCollapsedNavbar && "scroll-m-docs_7",
            !showCollapsedNavbar && "scroll-m-56",
        ], className), ...props, ref: passRef },
        children,
        props.id && (react_1.default.createElement(components_1.CopyButton, { text: copyText, className: "opacity-0 group-hover/h2:opacity-100 transition-opacity ml-docs_0.5 inline-block" },
            react_1.default.createElement(components_1.Link, { href: `#${props.id}`, scroll: false, prefetch: false }, "#")))));
};
exports.H2 = H2;
