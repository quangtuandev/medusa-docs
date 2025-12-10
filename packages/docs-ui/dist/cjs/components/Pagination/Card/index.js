"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationCard = void 0;
const icons_1 = require("@medusajs/icons");
const clsx_1 = __importDefault(require("clsx"));
const link_1 = __importDefault(require("next/link"));
const react_1 = __importDefault(require("react"));
const PaginationCard = ({ type, title, parentTitle, link, className, }) => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("relative flex-1", "py-docs_0.5 px-docs_0.75 rounded", "bg-medusa-bg-component hover:bg-medusa-bg-component-hover", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "hover:shadow-elevation-card-hover dark:shadow-elevation-card-hover-dark", className) },
        react_1.default.createElement(link_1.default, { href: link, className: "absolute top-0 left-0 w-full h-full" }),
        react_1.default.createElement("div", { className: (0, clsx_1.default)("h-[40px] flex gap-docs_0.75 items-center") },
            type === "previous" && (react_1.default.createElement(icons_1.TriangleLeftMini, { className: "text-medusa-fg-muted" })),
            react_1.default.createElement("div", { className: (0, clsx_1.default)("flex-1", type === "previous" && "text-left", type === "next" && "text-right") },
                parentTitle && (react_1.default.createElement("span", { className: "block text-compact-small text-medusa-fg-subtle" }, parentTitle)),
                react_1.default.createElement("span", { className: "block text-compact-small-plus text-medusa-fg-base" }, title)),
            type === "next" && (react_1.default.createElement(icons_1.TriangleRightMini, { className: "text-medusa-fg-muted" })))));
};
exports.PaginationCard = PaginationCard;
