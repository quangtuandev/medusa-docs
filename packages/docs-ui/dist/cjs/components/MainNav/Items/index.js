"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainNavItems = void 0;
const react_1 = __importDefault(require("react"));
const __1 = require("../../..");
const clsx_1 = __importDefault(require("clsx"));
const Link_1 = require("./Link");
const Dropdown_1 = require("./Dropdown");
const MainNavItems = ({ className }) => {
    const { navItems, activeItemIndex } = (0, __1.useMainNav)();
    return (react_1.default.createElement("ul", { className: (0, clsx_1.default)("hidden lg:flex justify-start gap-docs_1 items-center", "my-docs_0.75", className) }, navItems.map((item, index) => {
        const isActive = index === activeItemIndex;
        return (react_1.default.createElement("li", { className: (0, clsx_1.default)("flex items-center group"), key: index },
            item.type === "link" && (react_1.default.createElement(Link_1.MainNavItemLink, { item: item, isActive: isActive })),
            item.type === "dropdown" && (react_1.default.createElement(Dropdown_1.MainNavItemDropdown, { item: item, isActive: isActive }))));
    })));
};
exports.MainNavItems = MainNavItems;
