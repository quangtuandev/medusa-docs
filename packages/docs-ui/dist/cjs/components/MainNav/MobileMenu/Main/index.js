"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainNavMobileMainMenu = void 0;
const react_1 = __importDefault(require("react"));
const providers_1 = require("../../../../providers");
const link_1 = __importDefault(require("next/link"));
const icons_1 = require("@medusajs/icons");
const clsx_1 = __importDefault(require("clsx"));
const MainNavMobileMainMenu = ({ setSelectedMenus: setSelectedMenu, onOpenLink, }) => {
    const { navItems } = (0, providers_1.useMainNav)();
    return (react_1.default.createElement("div", { className: "flex flex-col gap-[23px]" },
        react_1.default.createElement("span", { className: "text-compact-small-plus text-medusa-fg-muted uppercase" }, "Menu"),
        react_1.default.createElement("ul", { className: "flex flex-col gap-[18px]" }, navItems.map((item, index) => (react_1.default.createElement("li", { key: index, className: (0, clsx_1.default)("text-h1 text-medusa-fg-base cursor-pointer", "flex justify-between gap-docs_1"), onClick: () => {
                if (item.type !== "dropdown") {
                    return;
                }
                setSelectedMenu((prev) => [
                    ...prev,
                    {
                        title: item.title,
                        menu: item.children,
                    },
                ]);
            } },
            item.type === "link" && (react_1.default.createElement(link_1.default, { href: item.link, className: "block w-full", onClick: () => onOpenLink?.() }, item.title)),
            item.type === "dropdown" && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("span", null, item.title),
                react_1.default.createElement(icons_1.TriangleRightMini, null)))))))));
};
exports.MainNavMobileMainMenu = MainNavMobileMainMenu;
