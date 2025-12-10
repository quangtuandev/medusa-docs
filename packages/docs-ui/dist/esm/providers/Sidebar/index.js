"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState, } from "react";
import { areSidebarItemsEqual, findSidebarItem, getSidebarItemWithHistory, isSidebarItemLink, } from "../../utils/sidebar-utils";
import { useSiteConfig } from "../SiteConifg";
import { useIsBrowser } from "../BrowserProvider";
import { getScrolledTop } from "../../utils";
import { usePathname, useRouter } from "next/navigation";
export const SidebarContext = createContext(null);
export const reducer = (state, actionData) => {
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
                            return !itemsToRemove.some((itemToRemove) => areSidebarItemsEqual({
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
                            const itemToUpdate = actionData.items.find((i) => areSidebarItemsEqual({
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
        items = items.filter((item) => findSidebarItem({ sidebarItems: sidebar.items, item }) === undefined);
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
                            areSidebarItemsEqual({
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
                                    : isSidebarItemLink(i)
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
export const SidebarProvider = ({ children, isLoading, setIsLoading, sidebars: initialSidebars = [], shouldHandleHashChange = false, shouldHandlePathChange = true, scrollableElement, isSidebarStatic = true, persistCategoryState = true, disableActiveTransition = true, }) => {
    const { config: { project }, } = useSiteConfig();
    const categoriesStorageKey = `${project.title}_categories`;
    const hideSidebarStorageKey = `hide_sidebar`;
    const [sidebars, dispatch] = useReducer(reducer, initialSidebars);
    const [activePath, setActivePath] = useState("");
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
    const sidebarRef = useRef(null);
    const [sidebarTopHeight, setSidebarTopHeight] = useState(0);
    const pathname = usePathname();
    const router = useRouter();
    const { isBrowser } = useIsBrowser();
    const resolvedScrollableElement = useMemo(() => {
        if (!isBrowser) {
            return;
        }
        return scrollableElement || window;
    }, [scrollableElement, isBrowser]);
    const activeMainSidebar = useMemo(() => {
        if (!activePath || sidebars.length === 1) {
            // set first sidebar as active
            return sidebars[0];
        }
        return (sidebars.find((s) => findSidebarItem({
            sidebarItems: s.items,
            item: { type: "link", path: activePath, title: "" },
            compareTitles: false,
        }) !== undefined) || sidebars[0]);
    }, [sidebars, activePath]);
    const { activeItem, sidebarHistory } = useMemo(() => {
        if (!activePath) {
            return {
                activeItem: null,
                sidebarHistory: [],
            };
        }
        const result = getSidebarItemWithHistory({
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
    const getSidebar = useCallback((sidebar_id) => {
        return (sidebars.find((s) => s.sidebar_id === sidebar_id) ||
            findSidebarItem({
                sidebarItems: activeMainSidebar.items || [],
                item: { type: "sidebar", sidebar_id, title: "" },
                compareTitles: false,
            }));
    }, [sidebars, activeMainSidebar]);
    const shownSidebar = useMemo(() => {
        if (!sidebarHistory.length) {
            return sidebars.length === 1 ? sidebars[0] : undefined;
        }
        return getSidebar(sidebarHistory[sidebarHistory.length - 1]);
    }, [activeMainSidebar, sidebarHistory, getSidebar]);
    const isItemActive = useCallback(({ item, checkLinkChildren = true }) => {
        if (!activePath) {
            return false;
        }
        if (isSidebarItemLink(item)) {
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
    const isSidebarShown = useMemo(() => {
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
    const resetItems = useCallback(() => {
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
    useEffect(() => {
        if (shouldHandleHashChange) {
            init();
        }
    }, [shouldHandleHashChange]);
    const handleScroll = useCallback(() => {
        const scrolledTop = getScrolledTop(resolvedScrollableElement);
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
    useEffect(() => {
        if (!shouldHandleHashChange || !resolvedScrollableElement) {
            return;
        }
        resolvedScrollableElement.addEventListener("scroll", handleScroll);
        return () => {
            resolvedScrollableElement.removeEventListener("scroll", handleScroll);
        };
    }, [shouldHandleHashChange, resolvedScrollableElement, handleScroll]);
    useEffect(() => {
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
    useEffect(() => {
        if (isLoading && sidebars.length) {
            setIsLoading?.(false);
        }
    }, [sidebars, isLoading, setIsLoading]);
    useEffect(() => {
        if (!shouldHandlePathChange) {
            return;
        }
        if (pathname !== activePath) {
            setActivePath(pathname);
        }
    }, [shouldHandlePathChange, pathname]);
    useEffect(() => {
        if (!isBrowser) {
            return;
        }
        const storageValue = localStorage.getItem(hideSidebarStorageKey);
        if (storageValue !== null) {
            setDesktopSidebarOpen(storageValue === "false");
        }
    }, [isBrowser]);
    useEffect(() => {
        if (!isBrowser) {
            return;
        }
        localStorage.setItem(hideSidebarStorageKey, `${desktopSidebarOpen === false}`);
    }, [isBrowser, desktopSidebarOpen]);
    useEffect(() => {
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
    const getFirstLinkChild = useCallback((items) => {
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
    const getSidebarFirstLinkChild = useCallback((sidebar) => {
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
    return (React.createElement(SidebarContext.Provider, { value: {
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
export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used inside a SidebarProvider");
    }
    return context;
};
