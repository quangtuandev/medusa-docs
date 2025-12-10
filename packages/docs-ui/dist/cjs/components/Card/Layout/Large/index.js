"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardLargeLayout = void 0;
const react_1 = __importDefault(require("react"));
const __1 = require("../../../..");
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const link_1 = __importDefault(require("next/link"));
const CardLargeLayout = ({ title, text, image, icon, href, className, }) => {
    const isExternal = (0, __1.useIsExternalLink)({ href });
    const IconComponent = icon;
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("relative flex flex-col gap-docs_0.75", "justify-start group", className) },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("rounded-docs_DEFAULT bg-medusa-bg-component w-[290px] h-[144px]", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", href &&
                "group-hover:shadow-elevation-card-hover group-hover:dark:shadow-elevation-card-hover-dark", "px-docs_0.75 py-docs_0.5 flex justify-center items-center w-full") },
            IconComponent && (react_1.default.createElement(IconComponent, { className: "text-medusa-fg-subtle", width: 32, height: 32, viewBox: "0 0 32 32" })),
            image && (react_1.default.createElement("img", { src: image, alt: title || text || "", className: "w-[144px]" }))),
        react_1.default.createElement("div", { className: "flex flex-col" },
            react_1.default.createElement("div", { className: "flex gap-docs_0.25 items-center text-medusa-fg-base" },
                title && react_1.default.createElement("span", { className: "text-compact-small-plus" }, title),
                href && isExternal && react_1.default.createElement(icons_1.ArrowUpRightOnBox, null),
                href && !isExternal && (react_1.default.createElement(icons_1.TriangleRightMini, { className: "group-hover:translate-x-docs_0.125 transition-transform" }))),
            text && (react_1.default.createElement("span", { className: "text-small-plus text-medusa-fg-subtle" }, text))),
        href && (react_1.default.createElement(link_1.default, { href: href, className: "absolute left-0 top-0 h-full w-full rounded", prefetch: false }))));
};
exports.CardLargeLayout = CardLargeLayout;
