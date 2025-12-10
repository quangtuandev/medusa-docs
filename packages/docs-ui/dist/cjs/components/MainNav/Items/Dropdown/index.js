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
exports.MainNavItemDropdown = void 0;
const icons_1 = require("@medusajs/icons");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const __1 = require("../../../..");
const Link_1 = require("../Link");
const MainNavItemDropdown = ({ item, isActive, className, wrapperClassName, }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    const getItemContent = () => {
        if (item.link) {
            return (react_1.default.createElement(Link_1.MainNavItemLink, { item: {
                    ...item,
                    link: item.link,
                    type: "link",
                }, isActive: isActive, icon: react_1.default.createElement(icons_1.TriangleDownMini, { className: (0, clsx_1.default)("transition-transform", isOpen && "rotate-180") }), className: "!flex" }));
        }
        return (react_1.default.createElement("div", { className: (0, clsx_1.default)("cursor-pointer flex gap-docs_0.25 items-center py-docs_0.25", isActive && "text-medusa-fg-base", !isActive && [
                "text-medusa-fg-muted hover:text-medusa-fg-subtle",
                isOpen && "text-medusa-fg-subtle",
            ], className), tabIndex: -1 },
            react_1.default.createElement("span", { className: "text-compact-small-plus" }, item.title),
            react_1.default.createElement(icons_1.TriangleDownMini, { className: (0, clsx_1.default)("transition-transform", isOpen && "rotate-180") })));
    };
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("relative", wrapperClassName), ref: ref, onMouseOver: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) },
        getItemContent(),
        react_1.default.createElement("div", { className: "absolute top-full -left-docs_0.75 pt-docs_0.25" },
            react_1.default.createElement(__1.Menu, { className: (0, clsx_1.default)("min-w-[190px]", !isOpen && "hidden"), items: item.children, itemsOnClick: () => setIsOpen(false) }))));
};
exports.MainNavItemDropdown = MainNavItemDropdown;
