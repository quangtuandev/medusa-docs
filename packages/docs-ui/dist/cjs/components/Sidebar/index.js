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
exports.Sidebar = void 0;
const react_1 = __importStar(require("react"));
const providers_1 = require("../../providers");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../components");
const Item_1 = require("./Item");
// @ts-expect-error can't install the types package because it doesn't support React v19
const react_transition_group_1 = require("react-transition-group");
const Top_1 = require("./Top");
const hooks_1 = require("../../hooks");
const resize_observer_1 = __importDefault(require("@react-hook/resize-observer"));
const sidebar_utils_1 = require("../../utils/sidebar-utils");
const Sidebar = ({ className = "" }) => {
    const sidebarWrapperRef = (0, react_1.useRef)(null);
    const sidebarTopRef = (0, react_1.useRef)(null);
    const { sidebars, shownSidebar, mobileSidebarOpen, setMobileSidebarOpen, isSidebarStatic, sidebarRef, desktopSidebarOpen, setDesktopSidebarOpen, setSidebarTopHeight, sidebarHistory, } = (0, providers_1.useSidebar)();
    (0, hooks_1.useClickOutside)({
        elmRef: sidebarWrapperRef,
        onClickOutside: () => {
            if (mobileSidebarOpen) {
                setMobileSidebarOpen(false);
            }
        },
    });
    (0, hooks_1.useKeyboardShortcut)({
        metakey: true,
        shortcutKeys: ["\\"],
        action: () => {
            setDesktopSidebarOpen((prev) => !prev);
        },
    });
    (0, resize_observer_1.default)(sidebarTopRef, () => {
        setSidebarTopHeight(sidebarTopRef.current?.clientHeight || 0);
    });
    const sidebarItems = (0, react_1.useMemo)(() => {
        return shownSidebar && "items" in shownSidebar
            ? shownSidebar.items
            : shownSidebar?.children || [];
    }, [shownSidebar]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        mobileSidebarOpen && (react_1.default.createElement("div", { className: (0, clsx_1.default)("lg:hidden bg-medusa-bg-overlay opacity-70", "fixed top-0 left-0 w-full h-full z-[45]") })),
        react_1.default.createElement("aside", { className: (0, clsx_1.default)("bg-medusa-bg-base lg:bg-transparent block", "fixed -left-full top-0 h-[calc(100%-16px)] transition-[left] lg:relative lg:h-auto", "max-w-sidebar-xs sm:max-w-sidebar-sm md:max-w-sidebar-md lg:max-w-sidebar-lg", "xl:max-w-sidebar-xl xxl:max-w-sidebar-xxl xxxl:max-w-sidebar-xxxl", "w-sidebar-xs sm:w-auto", mobileSidebarOpen && [
                "!left-docs_0.5 !top-docs_0.5 z-50 shadow-elevation-modal dark:shadow-elevation-modal-dark",
                "rounded",
                "lg:!left-0 lg:!top-0 lg:shadow-none",
            ], desktopSidebarOpen && "lg:left-0", !desktopSidebarOpen && "lg:!absolute lg:!-left-full", className), style: {
                animationFillMode: "forwards",
            }, ref: sidebarWrapperRef },
            react_1.default.createElement("ul", { className: (0, clsx_1.default)("h-full w-full", "flex flex-col") },
                react_1.default.createElement(react_transition_group_1.SwitchTransition, null,
                    react_1.default.createElement(react_transition_group_1.CSSTransition, { key: sidebarHistory.length
                            ? sidebarHistory[sidebarHistory.length - 1]
                            : sidebars[0].sidebar_id, nodeRef: sidebarRef, classNames: {
                            enter: "animate-fadeInLeft animate-fast",
                            exit: "animate-fadeOutLeft animate-fast",
                        }, timeout: 200 },
                        react_1.default.createElement("div", { className: (0, clsx_1.default)("overflow-y-scroll clip", "pb-docs_0.75 flex-1 max-h-screen"), ref: sidebarRef, id: "sidebar" },
                            react_1.default.createElement(Top_1.SidebarTop, { ref: sidebarTopRef }),
                            react_1.default.createElement("div", { className: "pt-docs_0.75" },
                                !sidebarItems.length && !isSidebarStatic && (react_1.default.createElement(components_1.Loading, { className: "px-docs_0.75" })),
                                sidebarItems.map((item, index) => {
                                    const itemKey = item.type === "separator"
                                        ? index
                                        : (0, sidebar_utils_1.isSidebarItemLink)(item)
                                            ? `${item.path}-${index}`
                                            : `${item.title}-${index}`;
                                    return (react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(components_1.Loading, { count: 1, className: "!mb-0 !px-docs_0.5", barClassName: "h-[20px]" }), key: itemKey },
                                        react_1.default.createElement(Item_1.SidebarItem, { item: item, hasNextItems: index !== sidebarItems.length - 1 })));
                                })))))))));
};
exports.Sidebar = Sidebar;
