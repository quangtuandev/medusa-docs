"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainNavThemeMenu = void 0;
const react_1 = __importDefault(require("react"));
const providers_1 = require("../../../../providers");
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const MainNavThemeMenu = () => {
    const { colorMode, setColorMode } = (0, providers_1.useColorMode)();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, clsx_1.default)("flex items-center gap-docs_0.5", "py-docs_0.25 px-docs_0.5", "rounded-docs_xs text-compact-x-small-plus", "text-medusa-fg-subtle") }, "Theme"),
        react_1.default.createElement("div", { className: "px-docs_0.25" },
            react_1.default.createElement("div", { className: (0, clsx_1.default)("flex items-center gap-docs_0.5", "py-docs_0.25 px-docs_0.5 cursor-pointer", "rounded-docs_xs text-medusa-fg-base", "hover:bg-medusa-bg-component-hover"), tabIndex: -1, onClick: () => setColorMode("light") },
                react_1.default.createElement(icons_1.EllipseMiniSolid, { className: (0, clsx_1.default)(colorMode !== "light" && "invisible") }),
                react_1.default.createElement("span", { className: (0, clsx_1.default)(colorMode !== "light" && "text-compact-small", colorMode === "light" && "text-compact-small-plus") }, "Light"))),
        react_1.default.createElement("div", { className: "px-docs_0.25" },
            react_1.default.createElement("div", { className: (0, clsx_1.default)("flex items-center gap-docs_0.5", "py-docs_0.25 px-docs_0.5 cursor-pointer", "rounded-docs_xs text-medusa-fg-base", "hover:bg-medusa-bg-component-hover"), tabIndex: -1, onClick: () => setColorMode("dark") },
                react_1.default.createElement(icons_1.EllipseMiniSolid, { className: (0, clsx_1.default)(colorMode !== "dark" && "invisible") }),
                react_1.default.createElement("span", { className: (0, clsx_1.default)(colorMode !== "dark" && "text-compact-small", colorMode === "dark" && "text-compact-small-plus") }, "Dark")))));
};
exports.MainNavThemeMenu = MainNavThemeMenu;
