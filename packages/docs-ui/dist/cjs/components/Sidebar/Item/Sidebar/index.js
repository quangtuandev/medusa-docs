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
exports.SidebarItemSidebar = void 0;
// @refresh reset
const react_1 = __importStar(require("react"));
const __1 = require("../../../..");
const clsx_1 = __importDefault(require("clsx"));
const link_1 = __importDefault(require("next/link"));
const SidebarItemSidebar = ({ item, className, nested = false, }) => {
    const { getSidebarFirstLinkChild: getSidebarFirstChild } = (0, __1.useSidebar)();
    const isTitleOneWord = (0, react_1.useMemo)(() => item.title.split(" ").length === 1, [item.title]);
    const firstChild = (0, react_1.useMemo)(() => getSidebarFirstChild(item), [item]);
    return (react_1.default.createElement("li", null,
        react_1.default.createElement("span", { className: "block px-docs_0.75" },
            react_1.default.createElement(link_1.default, { href: firstChild?.isPathHref ? firstChild.path : `#${firstChild?.path}`, className: (0, clsx_1.default)("py-docs_0.25 px-docs_0.5", "block w-full rounded-docs_sm", !isTitleOneWord && "break-words", !nested && "text-medusa-fg-subtle", nested && "text-medusa-fg-muted", "hover:bg-medusa-bg-base-hover lg:hover:bg-medusa-bg-subtle-hover", "text-compact-small-plus", "flex justify-between items-center gap-[6px]", className), ...firstChild?.linkProps },
                react_1.default.createElement("span", { className: (0, clsx_1.default)(isTitleOneWord && "truncate", nested && "inline-block pl-docs_1.5") }, item.title),
                item.additionalElms,
                item.badge && (react_1.default.createElement(__1.Badge, { variant: item.badge.variant }, item.badge.text))))));
};
exports.SidebarItemSidebar = SidebarItemSidebar;
