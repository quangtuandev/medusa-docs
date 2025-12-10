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
exports.MainNavMobileSubMenu = void 0;
const clsx_1 = __importDefault(require("clsx"));
const link_1 = __importDefault(require("next/link"));
const react_1 = __importStar(require("react"));
const icons_1 = require("@medusajs/icons");
const MainNavMobileSubMenu = ({ menu, title, setSelectedMenus, onOpenLink, }) => {
    const filteredItems = (0, react_1.useMemo)(() => {
        return menu.filter((item) => item.type === "link" || item.type === "sub-menu");
    }, [menu]);
    return (react_1.default.createElement("div", { className: "flex flex-col gap-[23px] max-h-[90%]" },
        react_1.default.createElement("span", { className: "text-compact-small-plus text-medusa-fg-muted uppercase" }, title),
        react_1.default.createElement("ul", { className: "flex flex-col gap-[18px] max-h-full overflow-auto" }, filteredItems.map((item, index) => (react_1.default.createElement("li", { key: index, className: (0, clsx_1.default)("text-h1 text-medusa-fg-base cursor-pointer", "flex justify-between gap-docs_1") },
            item.type === "link" && (react_1.default.createElement(link_1.default, { href: item.link, className: "block w-full", onClick: () => onOpenLink?.() }, item.title)),
            item.type === "sub-menu" && (react_1.default.createElement("div", { className: "w-full flex justify-between gap-docs_1", onClick: () => setSelectedMenus((prev) => [
                    ...prev,
                    {
                        title: item.title,
                        menu: item.items,
                    },
                ]) },
                react_1.default.createElement("span", null, item.title),
                react_1.default.createElement(icons_1.TriangleRightMini, null)))))))));
};
exports.MainNavMobileSubMenu = MainNavMobileSubMenu;
