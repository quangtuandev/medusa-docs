"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarTopMobileClose = void 0;
const react_1 = __importDefault(require("react"));
const __1 = require("../../../..");
const icons_1 = require("@medusajs/icons");
const SidebarTopMobileClose = () => {
    const { setMobileSidebarOpen } = (0, __1.useSidebar)();
    return (react_1.default.createElement("div", { className: "m-docs_0.75 lg:hidden" },
        react_1.default.createElement(__1.Button, { variant: "transparent-clear", onClick: () => setMobileSidebarOpen(false), className: "!p-0 hover:!bg-transparent" },
            react_1.default.createElement(icons_1.XMarkMini, { className: "text-medusa-fg-subtle" }))));
};
exports.SidebarTopMobileClose = SidebarTopMobileClose;
