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
exports.SidebarChild = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const providers_1 = require("../../../providers");
const SidebarChild = () => {
    const { goBack, shownSidebar } = (0, providers_1.useSidebar)();
    const title = (0, react_1.useMemo)(() => {
        if (!shownSidebar) {
            return "";
        }
        return "childSidebarTitle" in shownSidebar
            ? shownSidebar.childSidebarTitle || shownSidebar.title
            : shownSidebar.title;
    }, [shownSidebar]);
    if (!shownSidebar) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("div", { className: "px-docs_0.75" },
        react_1.default.createElement("div", { onClick: goBack, className: (0, clsx_1.default)("flex items-center justify-start my-docs_0.75 gap-[10px]", "border border-transparent cursor-pointer mx-docs_0.5", "!text-medusa-fg-base !text-compact-small-plus"), tabIndex: -1 },
            react_1.default.createElement(icons_1.ArrowUturnLeft, null),
            react_1.default.createElement("span", { className: "truncate flex-1" }, title))));
};
exports.SidebarChild = SidebarChild;
