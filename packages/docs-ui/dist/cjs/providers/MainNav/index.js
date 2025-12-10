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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMainNav = exports.MainNavProvider = void 0;
const navigation_1 = require("next/navigation");
const react_1 = __importStar(require("react"));
const SiteConifg_1 = require("../SiteConifg");
const MainNavContext = (0, react_1.createContext)(null);
const MainNavProvider = ({ navItems, children, }) => {
    const pathname = (0, navigation_1.usePathname)();
    const { config } = (0, SiteConifg_1.useSiteConfig)();
    const baseUrl = `${config.baseUrl}${config.basePath}`;
    const findActiveItem = (items, currentUrl) => {
        let item;
        let fallbackIndex;
        items.some((childItem, index) => {
            if (childItem.type !== "link" && childItem.type !== "sub-menu") {
                return false;
            }
            if (childItem.type === "sub-menu") {
                const activeChildRes = findActiveItem(childItem.items, currentUrl);
                item = activeChildRes.item;
                fallbackIndex = activeChildRes.fallbackIndex;
                return !!item;
            }
            const isItemActive = currentUrl.startsWith(childItem.link);
            if (!isItemActive) {
                return false;
            }
            if (childItem.useAsFallback && fallbackIndex === undefined) {
                fallbackIndex = index;
                return false;
            }
            item = childItem;
            return true;
        });
        return {
            item,
            fallbackIndex,
        };
    };
    const activeItemIndex = (0, react_1.useMemo)(() => {
        const currentUrl = `${baseUrl}${pathname}`.replace(/\/$/, "");
        let fallbackIndex;
        const index = navItems.findIndex((item, index) => {
            if (item.type === "dropdown") {
                const { item: activeChild, fallbackIndex: childFallbackIndex } = findActiveItem(item.children, currentUrl);
                if (activeChild) {
                    fallbackIndex = childFallbackIndex;
                    return true;
                }
                return item.link && currentUrl.startsWith(item.link);
            }
            if (item.project && item.project !== config.project.key) {
                return false;
            }
            const isItemActive = currentUrl.startsWith(item.link);
            if (isItemActive && item.useAsFallback && fallbackIndex === undefined) {
                fallbackIndex = index;
                return false;
            }
            return isItemActive;
        });
        return index !== -1 ? index : fallbackIndex;
    }, [navItems, pathname, baseUrl, config]);
    const activeItem = (0, react_1.useMemo)(() => {
        if (activeItemIndex === undefined) {
            return;
        }
        return navItems[activeItemIndex];
    }, [navItems, activeItemIndex]);
    return (react_1.default.createElement(MainNavContext.Provider, { value: {
            navItems,
            activeItemIndex,
            activeItem,
        } }, children));
};
exports.MainNavProvider = MainNavProvider;
const useMainNav = () => {
    const context = (0, react_1.useContext)(MainNavContext);
    if (!context) {
        throw new Error("useMainNav must be used within a MainNavProvider");
    }
    return context;
};
exports.useMainNav = useMainNav;
