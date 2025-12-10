"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = void 0;
const clsx_1 = __importDefault(require("clsx"));
const link_1 = __importDefault(require("next/link"));
const react_1 = __importDefault(require("react"));
const MenuItem = ({ item, onClick }) => {
    return (react_1.default.createElement("div", { className: "px-docs_0.25" },
        react_1.default.createElement(link_1.default, { className: (0, clsx_1.default)("flex py-docs_0.25 px-docs_0.5", "gap-docs_0.5 rounded-docs_xs", "hover:bg-medusa-bg-component-hover", "text-medusa-fg-base"), href: item.link, onClick: () => onClick?.(item), target: item.openInNewTab ? "_blank" : undefined, rel: item.openInNewTab ? "noopener noreferrer" : undefined },
            item.icon && (react_1.default.createElement("span", { className: "text-medusa-fg-subtle mt-[2.5px] block" }, item.icon)),
            react_1.default.createElement("span", { className: "text-compact-small" }, item.title))));
};
exports.MenuItem = MenuItem;
