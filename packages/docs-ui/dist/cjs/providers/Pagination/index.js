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
exports.usePagination = exports.PaginationProvider = exports.PaginationContext = void 0;
const react_1 = __importStar(require("react"));
const usehooks_1 = require("@uidotdev/usehooks");
const Sidebar_1 = require("../Sidebar");
const sidebar_utils_1 = require("../../utils/sidebar-utils");
exports.PaginationContext = (0, react_1.createContext)(null);
const PaginationProvider = ({ children }) => {
    const { shownSidebar, activePath } = (0, Sidebar_1.useSidebar)();
    const previousActivePath = (0, usehooks_1.usePrevious)(activePath);
    const [nextPage, setNextPage] = (0, react_1.useState)();
    const [prevPage, setPrevPage] = (0, react_1.useState)();
    const getFirstChild = (item) => {
        const children = getChildrenWithPages(item);
        if (!children?.length) {
            return undefined;
        }
        return (0, sidebar_utils_1.isSidebarItemLink)(children[0])
            ? {
                ...children[0],
                parent: item,
            }
            : getFirstChild(children[0]);
    };
    const getChildrenWithPages = (item) => {
        return item.children?.filter((childItem) => (0, sidebar_utils_1.isSidebarItemLink)(childItem) ||
            (childItem.type !== "separator" &&
                getChildrenWithPages(childItem)?.length));
    };
    const getPrevItem = (items, index) => {
        let foundItem;
        items
            .slice(0, index)
            .reverse()
            .some((item) => {
            if (item.type === "separator") {
                return false;
            }
            if (item.children?.length) {
                const childItem = getPrevItem(item.children, item.children.length);
                if (childItem) {
                    foundItem = {
                        ...childItem,
                        parent: item,
                    };
                }
            }
            else if ((0, sidebar_utils_1.isSidebarItemLink)(item)) {
                foundItem = item;
            }
            return foundItem !== undefined;
        });
        return foundItem;
    };
    const getNextItem = (items, index) => {
        let foundItem;
        items.slice(index + 1).some((item) => {
            if (item.type === "separator") {
                return false;
            }
            if ((0, sidebar_utils_1.isSidebarItemLink)(item)) {
                foundItem = item;
            }
            else if (item.children?.length) {
                const childItem = getNextItem(item.children, -1);
                if (childItem) {
                    foundItem = {
                        ...childItem,
                        parent: item,
                    };
                }
            }
            return foundItem !== undefined;
        });
        return foundItem;
    };
    const searchItems = (currentItems) => {
        const result = {
            foundActive: false,
        };
        result.foundActive = currentItems.some((item, index) => {
            if ((0, sidebar_utils_1.isSidebarItemLink)(item) && item.path === activePath) {
                if (index !== 0) {
                    result.prevItem = getPrevItem(currentItems, index);
                }
                if (item.children?.length) {
                    result.nextItem = getFirstChild(item);
                }
                if (!result.nextItem && index !== currentItems.length - 1) {
                    result.nextItem = getNextItem(currentItems, index);
                }
                return true;
            }
            if (item.type !== "separator" && item.children?.length) {
                const childrenResult = searchItems(item.children);
                if (childrenResult.foundActive) {
                    result.prevItem = childrenResult.prevItem;
                    result.nextItem = childrenResult.nextItem;
                    if (!result.prevItem) {
                        result.prevItem = (0, sidebar_utils_1.isSidebarItemLink)(item)
                            ? item
                            : getPrevItem(currentItems, index);
                    }
                    if (!result.nextItem && index !== currentItems.length - 1) {
                        result.nextItem = getNextItem(currentItems, index);
                    }
                    return true;
                }
            }
            return false;
        });
        return result;
    };
    (0, react_1.useEffect)(() => {
        if (activePath !== previousActivePath) {
            const sidebarItems = shownSidebar && "items" in shownSidebar
                ? shownSidebar.items
                : shownSidebar?.children || [];
            const result = searchItems(sidebarItems);
            setPrevPage(result.prevItem
                ? {
                    title: result.prevItem.title,
                    link: (0, sidebar_utils_1.isSidebarItemLink)(result.prevItem)
                        ? result.prevItem.path
                        : "",
                    parentTitle: result.prevItem.parent?.title,
                }
                : undefined);
            setNextPage(result.nextItem
                ? {
                    title: result.nextItem.title,
                    link: (0, sidebar_utils_1.isSidebarItemLink)(result.nextItem)
                        ? result.nextItem.path
                        : "",
                    parentTitle: result.nextItem?.parent?.title,
                }
                : undefined);
        }
    }, [activePath, previousActivePath]);
    return (react_1.default.createElement(exports.PaginationContext.Provider, { value: {
            previousPage: prevPage,
            nextPage,
        } }, children));
};
exports.PaginationProvider = PaginationProvider;
const usePagination = () => {
    const context = (0, react_1.useContext)(exports.PaginationContext);
    if (!context) {
        throw new Error("usePagination must be used inside a PaginationProvider");
    }
    return context;
};
exports.usePagination = usePagination;
