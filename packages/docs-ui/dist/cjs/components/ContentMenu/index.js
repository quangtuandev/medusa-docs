"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentMenu = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const Toc_1 = require("./Toc");
const providers_1 = require("../../providers");
const ContentMenu = () => {
    const { showCollapsedNavbar } = (0, providers_1.useLayout)();
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("hidden lg:flex w-full max-w-sidebar-lg", "flex-col gap-docs_2 pb-docs_1.5 mr-docs_1", "fixed top-[57px] right-docs_0.25 z-10", showCollapsedNavbar && "max-h-[calc(100%-112px)] pt-[84px]", !showCollapsedNavbar && "max-h-[calc(100%-56px)] pt-[28px]") },
        react_1.default.createElement("div", { className: "flex flex-col gap-docs_1.5 flex-1 overflow-auto" },
            react_1.default.createElement(Toc_1.ContentMenuToc, null))));
};
exports.ContentMenu = ContentMenu;
