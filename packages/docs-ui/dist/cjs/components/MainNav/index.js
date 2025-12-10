"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainNav = void 0;
const react_1 = __importDefault(require("react"));
const __1 = require("../..");
const MainNav = ({ className, itemsClassName }) => {
    const { setMobileSidebarOpen, isSidebarShown } = (0, __1.useSidebar)();
    const { config } = (0, __1.useSiteConfig)();
    const { showCollapsedNavbar } = (0, __1.useLayout)();
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "MainNav")));
};
exports.MainNav = MainNav;
