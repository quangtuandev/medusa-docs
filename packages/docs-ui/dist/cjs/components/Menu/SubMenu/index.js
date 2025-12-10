"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuSubMenu = void 0;
const react_1 = __importStar(require("react"));
const __1 = require("..");
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const link_1 = __importDefault(require("next/link"));
const MenuSubMenu = ({ item, itemsOnClick }) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const Component = item.link ? link_1.default : "span";
    return (react_1.default.createElement("div", { className: "px-docs_0.25 relative", onMouseOver: () => setOpen(true), onMouseLeave: () => setOpen(false) },
        react_1.default.createElement(Component, { className: (0, clsx_1.default)("flex py-docs_0.25 px-docs_0.5", "gap-docs_0.5 rounded-docs_xs", "hover:bg-medusa-bg-component-hover", "text-medusa-fg-base justify-between"), onClick: () => itemsOnClick?.(item), href: item.link || "#" },
            react_1.default.createElement("span", { className: "text-compact-small" }, item.title),
            react_1.default.createElement("span", { className: "text-medusa-fg-subtle mt-[2.5px] block" },
                react_1.default.createElement(icons_1.TriangleRightMini, null))),
        open && (react_1.default.createElement("div", { className: "absolute top-0 left-[calc(100%-8px)] w-max" },
            react_1.default.createElement(__1.Menu, { itemsOnClick: itemsOnClick, items: item.items })))));
};
exports.MenuSubMenu = MenuSubMenu;
