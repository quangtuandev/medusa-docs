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
exports.MainNavMobileMenu = void 0;
const react_1 = __importStar(require("react"));
const Button_1 = require("../../Button");
const icons_1 = require("@medusajs/icons");
const clsx_1 = __importDefault(require("clsx"));
// @ts-expect-error can't install the types package because it doesn't support React v19
const react_transition_group_1 = require("react-transition-group");
const Main_1 = require("./Main");
const SubMenu_1 = require("./SubMenu");
const MainNavMobileMenu = () => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [selectedMenus, setSelectedMenus] = (0, react_1.useState)([]);
    const ref = (0, react_1.useRef)(null);
    const handleOpenLink = () => {
        setIsOpen(false);
    };
    return (react_1.default.createElement("div", { className: "flex lg:hidden justify-center items-center" },
        react_1.default.createElement(Button_1.Button, { variant: "transparent", onClick: () => setIsOpen((prev) => !prev), className: "text-medusa-fg-subtle !p-[6.5px]" },
            !isOpen && react_1.default.createElement(icons_1.BarsThree, null),
            isOpen && react_1.default.createElement(icons_1.XMark, null)),
        react_1.default.createElement("div", { className: (0, clsx_1.default)("flex items-center justify-center fixed w-full h-[calc(100vh-52px)]", "top-[52px] transition-[left] bg-medusa-bg-subtle z-50", !isOpen && "-left-full", isOpen && "left-0") },
            react_1.default.createElement(react_transition_group_1.SwitchTransition, null,
                react_1.default.createElement(react_transition_group_1.CSSTransition, { key: !selectedMenus.length
                        ? "main"
                        : selectedMenus[selectedMenus.length - 1].title, classNames: {
                        enter: "animate-fadeInLeft animate-fast",
                        exit: "animate-fadeOutRight animate-fast",
                    }, nodeRef: ref, timeout: 250 },
                    react_1.default.createElement("div", { ref: ref, className: "w-full px-docs_1.5 h-3/4 flex flex-col justify-center" },
                        selectedMenus.length === 0 && (react_1.default.createElement(Main_1.MainNavMobileMainMenu, { setSelectedMenus: setSelectedMenus, onOpenLink: handleOpenLink })),
                        selectedMenus.length > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("div", { className: (0, clsx_1.default)("flex items-center gap-docs_0.5", "text-medusa-fg-base my-[14px]", "cursor-pointer"), tabIndex: -1, onClick: () => setSelectedMenus((prev) => {
                                    const temp = [...prev];
                                    temp.pop();
                                    return temp;
                                }) },
                                react_1.default.createElement(icons_1.ArrowUturnLeft, null),
                                react_1.default.createElement("span", { className: "text-h1" }, "Back")),
                            react_1.default.createElement(SubMenu_1.MainNavMobileSubMenu, { ...selectedMenus[selectedMenus.length - 1], setSelectedMenus: setSelectedMenus, onOpenLink: handleOpenLink })))))))));
};
exports.MainNavMobileMenu = MainNavMobileMenu;
