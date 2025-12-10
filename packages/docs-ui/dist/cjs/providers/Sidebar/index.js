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
exports.useSidebar = exports.SidebarProvider = exports.reducer = exports.SidebarContext = void 0;
const react_1 = __importStar(require("react"));
const sidebar_utils_1 = require("../../utils/sidebar-utils");
const SiteConifg_1 = require("../SiteConifg");
const BrowserProvider_1 = require("../BrowserProvider");
const utils_1 = require("../../utils");
const navigation_1 = require("next/navigation");
exports.SidebarContext = (0, react_1.createContext)(null);
const reducer = (state, actionData) => {
    switch (actionData.type) {
        case "replace":
            return actionData.sidebars;
        case "remove": {
            const { sidebar_id, items: itemsToRemove } = actionData;
            return state.map((sidebar) => {
                if (sidebar.sidebar_id === sidebar_id) {
                    return {
                        ...sidebar,
                        items: sidebar.items.filter((item) => {
                            return !itemsToRemove.some((itemToRemove) => (0, sidebar_utils_1.areSidebarItemsEqual)({
                                itemA: item,
                                itemB: itemToRemove,
                            }));
                        }),
                    };
                }
                return sidebar;
            });
        }
        case "update":
            return state.map((sidebar) => {
                if (sidebar.sidebar_id === actionData.sidebar_id) {
                    return {
                        ...sidebar,
                        items: sidebar.items.map((item) => {
                            const itemToUpdate = actionData.items.find((i) => (0, sidebar_utils_1.areSidebarItemsEqual)({
                                itemA: item,
                                itemB: i.existingItem,
                            }));
                            if (itemToUpdate) {
                                const updatedItem = {
                                    ...item,
                                    ...itemToUpdate.newItem,
                                };
                                if ("children" in updatedItem) {
                                    updatedItem.children =
                                        itemToUpdate.options?.setChildrenBehavior === "merge"
                                            ? [
                                                ...(item
                                                    .children || []),
                                                ...(updatedItem.children || []),
                                            ]
                                            : updatedItem.children;
                                }
                                return updatedItem;
                            }
                            return item;
                        }),
                    };
                }
                return sidebar;
            });
    }
    const { type, options } = actionData;
    let { items } = actionData;
    const { parent, ignoreExisting = false, indexPosition } = options || {};
    const sidebarIndex = state.findIndex((s) => s.sidebar_id === options?.sidebar_id);
    const sidebar = state[sidebarIndex];
    if (!sidebar) {
        return state;
    }
    if (!ignoreExisting) {
        items = items.filter((item) => (0, sidebar_utils_1.findSidebarItem)({ sidebarItems: sidebar.items, item }) === undefined);
    }
    if (!items.length) {
        return state;
    }
    switch (type) {
        case "add":
            return [
                ...state.slice(0, sidebarIndex),
                {
                    ...sidebar,
                    items: indexPosition !== undefined
                        ? [
                            ...sidebar.items.slice(0, indexPosition),
                            ...items,
                            ...sidebar.items.slice(indexPosition),
                        ]
                        : [...sidebar.items, ...items],
                },
                ...state.slice(sidebarIndex + 1),
            ];
        case "update-child":
            // find item index
            return [
                ...state.slice(0, sidebarIndex),
                {
                    ...sidebar,
                    items: sidebar.items.map((i) => {
                        if (i.type === "separator") {
                            return i;
                        }
                        if (parent &&
                            (0, sidebar_utils_1.areSidebarItemsEqual)({
                                itemA: i,
                                itemB: parent,
                            })) {
                            return {
                                ...i,
                                children: indexPosition !== undefined
                                    ? [
                                        ...(i.children?.slice(0, indexPosition) || []),
                                        ...items,
                                        ...(i.children?.slice(indexPosition) || []),
                                    ]
                                    : [...(i.children || []), ...items],
                                loaded: parent.changeLoaded
                                    ? true
                                    : (0, sidebar_utils_1.isSidebarItemLink)(i)
                                        ? i.loaded
                                        : true,
                            };
                        }
                        return i;
                    }),
                },
                ...state.slice(sidebarIndex + 1),
            ];
        default:
            return state;
    }
};
exports.reducer = reducer;
const SidebarProvider = ({ children, isLoading, setIsLoading, sidebars: initialSidebars = [], shouldHandleHashChange = false, shouldHandlePathChange = true, scrollableElement, isSidebarStatic = true, persistCategoryState = true, disableActiveTransition = true, }) => {
    const { config: { project }, } = (0, SiteConifg_1.useSiteConfig)();
    const categoriesStorageKey = `${project.title}_categories`;
    const hideSidebarStorageKey = `hide_sidebar`;
    const [sidebars, dispatch] = (0, react_1.useReducer)(exports.reducer, initialSidebars);
    const [activePath, setActivePath] = (0, react_1.useState)("");
    const [mobileSidebarOpen, setMobileSidebarOpen] = (0, react_1.useState)(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = (0, react_1.useState)(true);
    const sidebarRef = (0, react_1.useRef)(null);
    const [sidebarTopHeight, setSidebarTopHeight] = (0, react_1.useState)(0);
    const pathname = (0, navigation_1.usePathname)();
    const router = (0, navigation_1.useRouter)();
    const { isBrowser } = (0, BrowserProvider_1.useIsBrowser)();
    const resolvedScrollableElement = (0, react_1.useMemo)(() => {
        if (!isBrowser) {
            return;
        }
        return scrollableElement || window;
    }, [scrollableElement, isBrowser]);
    const activeMainSidebar = (0, react_1.useMemo)(() => {
        if (!activePath || sidebars.length === 1) {
            // set first sidebar as active
            return sidebars[0];
        }
        return (sidebars.find((s) => (0, sidebar_utils_1.findSidebarItem)({
            sidebarItems: s.items,
            item: { type: "link", path: activePath, title: "" },
            compareTitles: false,
        }) !== undefined) || sidebars[0]);
    }, [sidebars, activePath]);
    const { activeItem, sidebarHistory } = (0, react_1.useMemo)(() => {
        if (!activePath) {
            return {
                activeItem: null,
                sidebarHistory: [],
            };
        }
        const result = (0, sidebar_utils_1.getSidebarItemWithHistory)({
            sidebarItems: activeMainSidebar.items,
            item: { type: "link", path: activePath, title: "" },
            compareTitles: false,
        }) || null;
        return {
            ...result,
            sidebarHistory: [
                activeMainSidebar.sidebar_id,
                ...(result.sidebarHistory || []),
            ],
            activeItem: result.item || null,
        };
    }, [activePath, activeMainSidebar]);
    const getSidebar = (0, react_1.useCallback)((sidebar_id) => {
        return (sidebars.find((s) => s.sidebar_id === sidebar_id) ||
            (0, sidebar_utils_1.findSidebarItem)({
                sidebarItems: activeMainSidebar.items || [],
                item: { type: "sidebar", sidebar_id, title: "" },
                compareTitles: false,
            }));
    }, [sidebars, activeMainSidebar]);
    const shownSidebar = (0, react_1.useMemo)(() => {
        if (!sidebarHistory.length) {
            return sidebars.length === 1 ? sidebars[0] : undefined;
        }
        return getSidebar(sidebarHistory[sidebarHistory.length - 1]);
    }, [activeMainSidebar, sidebarHistory, getSidebar]);
    const isItemActive = (0, react_1.useCallback)(({ item, checkLinkChildren = true }) => {
        if (!activePath) {
            return false;
        }
        if ((0, sidebar_utils_1.isSidebarItemLink)(item)) {
            if (item.path === activePath) {
                return true;
            }
            else if (!checkLinkChildren) {
                return false;
            }
        }
        return (item.children?.some((child) => {
            if (child.type === "separator") {
                return false;
            }
            return isItemActive({
                item: child,
                checkLinkChildren,
            });
        }) || false);
    }, [activePath]);
    const isSidebarShown = (0, react_1.useMemo)(() => {
        if (!isBrowser) {
            return true;
        }
        return document.getElementsByTagName("aside").length > 0;
    }, [isBrowser]);
    const addItems = (newItems, options) => {
        dispatch({
            type: options?.parent ? "update-child" : "add",
            items: newItems,
            options,
        });
    };
    const updateItems = ({ sidebar_id, items }) => {
        dispatch({
            type: "update",
            items,
            sidebar_id,
        });
    };
    const removeItems = ({ items, sidebar_id, }) => {
        dispatch({
            type: "remove",
            items,
            sidebar_id,
        });
    };
    const resetItems = (0, react_1.useCallback)(() => {
        dispatch({
            type: "replace",
            sidebars: initialSidebars,
        });
    }, [initialSidebars]);
    const init = () => {
        const currentPath = location.hash.replace("#", "");
        if (currentPath) {
            setActivePath(currentPath);
        }
        else {
            const firstChild = getFirstLinkChild(activeMainSidebar.items);
            if (firstChild) {
                setActivePath(firstChild.path);
            }
        }
    };
    (0, react_1.useEffect)(() => {
        if (shouldHandleHashChange) {
            init();
        }
    }, [shouldHandleHashChange]);
    const handleScroll = (0, react_1.useCallback)(() => {
        const scrolledTop = (0, utils_1.getScrolledTop)(resolvedScrollableElement);
        // account for navbar height
        if (scrolledTop >= 0 && scrolledTop <= 56) {
            const firstChild = getFirstLinkChild(activeMainSidebar.items);
            if (firstChild) {
                setActivePath(firstChild.path);
                router.push(`#${firstChild.path}`, {
                    scroll: false,
                });
            }
        }
    }, [activeMainSidebar, resolvedScrollableElement]);
    (0, react_1.useEffect)(() => {
        if (!shouldHandleHashChange || !resolvedScrollableElement) {
            return;
        }
        resolvedScrollableElement.addEventListener("scroll", handleScroll);
        return () => {
            resolvedScrollableElement.removeEventListener("scroll", handleScroll);
        };
    }, [shouldHandleHashChange, resolvedScrollableElement, handleScroll]);
    (0, react_1.useEffect)(() => {
        if (!shouldHandleHashChange || !isBrowser) {
            return;
        }
        // this is mainly triggered by Algolia
        const handleHashChange = () => {
            const currentPath = location.hash.replace("#", "");
            if (currentPath !== activePath) {
                setActivePath(currentPath);
            }
        };
        window.addEventListener("hashchange", handleHashChange);
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, [shouldHandleHashChange, isBrowser]);
    (0, react_1.useEffect)(() => {
        if (isLoading && sidebars.length) {
            setIsLoading?.(false);
        }
    }, [sidebars, isLoading, setIsLoading]);
    (0, react_1.useEffect)(() => {
        if (!shouldHandlePathChange) {
            return;
        }
        if (pathname !== activePath) {
            setActivePath(pathname);
        }
    }, [shouldHandlePathChange, pathname]);
    (0, react_1.useEffect)(() => {
        if (!isBrowser) {
            return;
        }
        const storageValue = localStorage.getItem(hideSidebarStorageKey);
        if (storageValue !== null) {
            setDesktopSidebarOpen(storageValue === "false");
        }
    }, [isBrowser]);
    (0, react_1.useEffect)(() => {
        if (!isBrowser) {
            return;
        }
        localStorage.setItem(hideSidebarStorageKey, `${desktopSidebarOpen === false}`);
    }, [isBrowser, desktopSidebarOpen]);
    (0, react_1.useEffect)(() => {
        if (initialSidebars[0].sidebar_id !== sidebars[0].sidebar_id) {
            resetItems();
        }
    }, [initialSidebars]);
    const updatePersistedCategoryState = (title, opened) => {
        const storageData = JSON.parse(localStorage.getItem(categoriesStorageKey) || "{}");
        if (!Object.hasOwn(storageData, project.title)) {
            storageData[project.title] = {};
        }
        storageData[project.title] = {
            ...storageData[project.title],
            [title]: opened,
        };
        localStorage.setItem(categoriesStorageKey, JSON.stringify(storageData));
    };
    const getPersistedCategoryState = (title) => {
        const storageData = JSON.parse(localStorage.getItem(categoriesStorageKey) || "{}");
        return !Object.hasOwn(storageData, project.title) ||
            !Object.hasOwn(storageData[project.title], title)
            ? undefined
            : storageData[project.title][title];
    };
    const getFirstLinkChild = (0, react_1.useCallback)((items) => {
        let foundItem;
        items.some((item) => {
            if (item.type === "link") {
                foundItem = item;
            }
            else if ("children" in item && item.children) {
                foundItem = getFirstLinkChild(item.children);
            }
            return foundItem !== undefined;
        });
        return foundItem;
    }, []);
    const getSidebarFirstLinkChild = (0, react_1.useCallback)((sidebar) => {
        const itemsToSearch = "items" in sidebar ? sidebar.items : sidebar.children || [];
        return getFirstLinkChild(itemsToSearch);
    }, [getFirstLinkChild]);
    const openSidebar = (sidebar_id) => {
        const sidebar = getSidebar(sidebar_id);
        if (!sidebar) {
            return;
        }
        const firstChild = getSidebarFirstLinkChild(sidebar);
        if (firstChild) {
            setActivePath(firstChild.path);
            router.replace(firstChild.isPathHref ? firstChild.path : `#${firstChild.path}`);
        }
    };
    const goBack = () => {
        if (!sidebarHistory || sidebarHistory.length <= 1) {
            openSidebar(activeMainSidebar.sidebar_id);
        }
        else {
            const lastSidebar = sidebarHistory[sidebarHistory.length - 2];
            openSidebar(lastSidebar);
        }
    };
    return (react_1.default.createElement(exports.SidebarContext.Provider, { value: {
            sidebars,
            shownSidebar,
            activePath,
            activeItem,
            setActivePath,
            isItemActive,
            addItems,
            updateItems,
            removeItems,
            mobileSidebarOpen,
            setMobileSidebarOpen,
            desktopSidebarOpen,
            setDesktopSidebarOpen,
            isSidebarStatic,
            shouldHandleHashChange,
            sidebarRef,
            goBack,
            sidebarTopHeight,
            setSidebarTopHeight,
            resetItems,
            updatePersistedCategoryState,
            getPersistedCategoryState,
            persistCategoryState,
            isSidebarShown,
            sidebarHistory,
            getSidebarFirstLinkChild,
            getSidebar,
            disableActiveTransition,
        } }, children));
};
exports.SidebarProvider = SidebarProvider;
const useSidebar = () => {
    const context = (0, react_1.useContext)(exports.SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used inside a SidebarProvider");
    }
    return context;
};
exports.useSidebar = useSidebar;
