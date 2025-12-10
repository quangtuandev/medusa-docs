"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainNavItemLink = void 0;
const react_1 = __importDefault(require("react"));
const __1 = require("../../../..");
const clsx_1 = __importDefault(require("clsx"));
const MainNavItemLink = ({ item, isActive, icon, className, }) => {
    return (react_1.default.createElement(__1.LinkButton, { href: item.link, className: (0, clsx_1.default)(isActive && "text-medusa-fg-base", !isActive && "text-medusa-fg-muted hover:text-medusa-fg-subtle", className) },
        item.title,
        icon));
};
exports.MainNavItemLink = MainNavItemLink;
