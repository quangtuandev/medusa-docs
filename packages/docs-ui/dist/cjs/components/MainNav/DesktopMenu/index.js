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
exports.MainNavDesktopMenu = void 0;
const icons_1 = require("@medusajs/icons");
const react_1 = __importStar(require("react"));
const __1 = require("../../..");
const clsx_1 = __importDefault(require("clsx"));
const House_1 = require("../../Icons/House");
const ThemeMenu_1 = require("./ThemeMenu");
const MainNavDesktopMenu = () => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const { setDesktopSidebarOpen, isSidebarShown, desktopSidebarOpen } = (0, __1.useSidebar)();
    const ref = (0, react_1.useRef)(null);
    (0, __1.useClickOutside)({
        elmRef: ref,
        onClickOutside: () => setIsOpen(false),
    });
    const items = (0, react_1.useMemo)(() => {
        const items = [
            {
                type: "link",
                icon: react_1.default.createElement(House_1.HouseIcon, null),
                title: "Homepage",
                link: "https://medusajs.com",
            },
            {
                type: "link",
                icon: react_1.default.createElement(icons_1.Book, null),
                title: "Medusa v1",
                link: "https://docs.medusajs.com/v1",
            },
            {
                type: "link",
                icon: react_1.default.createElement(icons_1.TimelineVertical, null),
                title: "Changelog",
                link: "https://medusajs.com/changelog",
            },
        ];
        if (isSidebarShown) {
            items.push({
                type: "divider",
            }, {
                type: "action",
                title: desktopSidebarOpen ? "Hide Sidebar" : "Show Sidebar",
                icon: react_1.default.createElement(icons_1.SidebarLeft, null),
                shortcut: `${(0, __1.getOsShortcut)()}\\`,
                action: () => {
                    setDesktopSidebarOpen((prev) => !prev);
                    setIsOpen(false);
                },
            });
        }
        items.push({
            type: "divider",
        }, {
            type: "custom",
            content: react_1.default.createElement(ThemeMenu_1.MainNavThemeMenu, null),
        });
        return items;
    }, [isSidebarShown, desktopSidebarOpen]);
    return (react_1.default.createElement("div", { className: "relative hidden lg:flex justify-center items-center", ref: ref },
        react_1.default.createElement(__1.Button, { variant: "transparent", onClick: () => setIsOpen((prev) => !prev), className: "!p-[6.5px]" },
            react_1.default.createElement(icons_1.BarsThree, { className: "text-medusa-fg-subtle" })),
        react_1.default.createElement(__1.Menu, { className: (0, clsx_1.default)("absolute top-[calc(100%+8px)] right-0 min-w-[200px]", !isOpen && "hidden"), items: items })));
};
exports.MainNavDesktopMenu = MainNavDesktopMenu;
