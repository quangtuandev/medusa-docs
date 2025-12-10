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
exports.MainContentLayout = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const __1 = require("..");
const ContentMenu_1 = require("../components/ContentMenu");
const MainContentLayout = ({ children, mainWrapperClasses, contentClassName, showContentMenu = true, }) => {
    const { isBrowser } = (0, __1.useIsBrowser)();
    const { desktopSidebarOpen } = (0, __1.useSidebar)();
    const { mainContentRef, showCollapsedNavbar } = (0, __1.useLayout)();
    const { frontmatter } = (0, __1.useSiteConfig)();
    const { chatOpened } = (0, __1.useAiAssistant)();
    (0, react_1.useEffect)(() => {
        if (!isBrowser) {
            return;
        }
        const rootLayout = document.getElementById("root-layout");
        if (desktopSidebarOpen) {
            rootLayout?.classList.add("lg:grid-cols-[221px_1fr]");
        }
        else {
            rootLayout?.classList.remove("lg:grid-cols-[221px_1fr]");
        }
    }, [desktopSidebarOpen, isBrowser]);
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("relative max-w-full", "h-full flex-1", "flex flex-col", "gap-docs_0.5 lg:py-docs_0.25 lg:mr-docs_0.25 scroll-m-docs_0.25", !desktopSidebarOpen && "lg:ml-docs_0.25", mainWrapperClasses) },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("bg-medusa-bg-base", "flex-col items-center", "h-full w-full", "overflow-y-scroll overflow-x-hidden", "md:rounded-docs_DEFAULT", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", mainWrapperClasses), id: "main", ref: mainContentRef },
            react_1.default.createElement(__1.MainNav, null),
            react_1.default.createElement("div", { className: (0, clsx_1.default)("pt-docs_4 lg:pt-docs_6 pb-docs_8 lg:pb-docs_4", showContentMenu && "grid grid-cols-1 lg:mx-auto", desktopSidebarOpen && "lg:grid-cols-[1fr_221px]", chatOpened && showCollapsedNavbar && "pl-docs_1", contentClassName), id: "content" },
                react_1.default.createElement("div", { className: "flex justify-center" }, children)),
            showContentMenu && !frontmatter.hide_content_menu && react_1.default.createElement(ContentMenu_1.ContentMenu, null))));
};
exports.MainContentLayout = MainContentLayout;
