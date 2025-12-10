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
exports.useChildDocs = void 0;
const react_1 = __importStar(require("react"));
const __1 = require("../..");
const slugify_1 = __importDefault(require("slugify"));
const __2 = require("../..");
const icons_1 = require("@medusajs/icons");
const sidebar_utils_1 = require("../../utils/sidebar-utils");
const useChildDocs = ({ onlyTopLevel = false, hideItems = [], showItems, type = "sidebar", hideTitle = false, hideDescription = false, titleLevel = 2, startChildLevel = 1, endChildLevel = -1, itemsPerRow, defaultItemsPerRow, search: { enable: enableSearch = false, storageKey = "child-docs", ...searchProps } = { enable: false }, }) => {
    const { shownSidebar, activeItem, getSidebarFirstLinkChild } = (0, __1.useSidebar)();
    const { isBrowser } = (0, __1.useIsBrowser)();
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const [localSearch, setLocalSearch] = (0, react_1.useState)();
    const TitleHeaderComponent = (0, react_1.useCallback)((level) => {
        switch (level) {
            case 3:
                return __1.H3;
            case 4:
                return __1.H4;
            case 5:
                return __2.MDXComponents["h5"];
            case 6:
                return __2.MDXComponents["h6"];
            default:
                return __1.H2;
        }
    }, []);
    const filterType = (0, react_1.useMemo)(() => {
        return showItems !== undefined
            ? "show"
            : hideItems.length > 0
                ? "hide"
                : "all";
    }, [showItems, hideItems]);
    const filterCondition = (item) => {
        if (item.type === "separator") {
            return false;
        }
        switch (filterType) {
            case "hide":
                return ((!(0, sidebar_utils_1.isSidebarItemLink)(item) || !hideItems.includes(item.path)) &&
                    !hideItems.includes(item.title));
            case "show":
                return (((0, sidebar_utils_1.isSidebarItemLink)(item) && showItems.includes(item.path)) ||
                    showItems.includes(item.title));
            case "all":
                return true;
        }
    };
    const filterItems = (items) => {
        return items.filter(filterCondition)
            .map((item) => Object.assign({}, item))
            .map((item) => {
            if (item.children && filterType === "hide") {
                item.children = filterItems(item.children);
            }
            return item;
        });
    };
    const filterNonInteractiveItems = (items) => {
        return (items?.filter((item) => item.type !== "separator") || []);
    };
    const getChildrenForLevel = ({ item, currentLevel = 1, }) => {
        if ((endChildLevel > 0 && currentLevel > endChildLevel) || !item.children) {
            return;
        }
        if (currentLevel >= startChildLevel) {
            return filterNonInteractiveItems(item.children);
        }
        const childrenResult = [];
        filterNonInteractiveItems(item.children).forEach((child) => {
            const childChildren = getChildrenForLevel({
                item: child,
                currentLevel: currentLevel + 1,
            });
            if (!childChildren) {
                return;
            }
            childrenResult.push(...childChildren);
        });
        return childrenResult;
    };
    const filteredItems = (0, react_1.useMemo)(() => {
        let targetItems = type === "sidebar"
            ? shownSidebar && "items" in shownSidebar
                ? shownSidebar.items
                : shownSidebar?.children || []
            : [...(activeItem?.children || [])];
        if (filterType !== "all" && targetItems) {
            targetItems = filterItems(targetItems);
        }
        return filterNonInteractiveItems(targetItems);
    }, [shownSidebar, type, activeItem, filterType]);
    const searchableItems = (0, react_1.useMemo)(() => {
        const searchableItems = [];
        if (!enableSearch) {
            return searchableItems;
        }
        if (onlyTopLevel) {
            filteredItems.forEach((item) => {
                if ((0, sidebar_utils_1.isSidebarItemLink)(item)) {
                    searchableItems.push(item);
                }
                else {
                    const firstChild = item.children?.find((child) => (0, sidebar_utils_1.isSidebarItemLink)(child));
                    if (firstChild) {
                        searchableItems.push(firstChild);
                    }
                }
            });
        }
        else {
            filteredItems?.forEach((item) => {
                const childItems = getChildrenForLevel({ item })?.filter((childItem) => {
                    return (0, sidebar_utils_1.isSidebarItemLink)(childItem);
                }) || [];
                searchableItems.push(...childItems);
            });
        }
        return searchableItems;
    }, [filteredItems, onlyTopLevel, enableSearch]);
    (0, react_1.useEffect)(() => {
        if (!enableSearch && localSearch) {
            setLocalSearch(undefined);
            return;
        }
        if (!enableSearch || !searchableItems?.length || localSearch) {
            return;
        }
        setLocalSearch((0, __1.getLocalSearch)({
            docs: searchableItems,
            searchableFields: ["title", "description"],
            options: {
                storeFields: ["title", "description", "path", "type"],
                searchOptions: {
                    boost: { title: 2 },
                    prefix: true,
                    fuzzy: 0.2,
                },
                idField: "path",
            },
        }));
    }, [searchableItems, enableSearch, localSearch]);
    const searchResult = (0, react_1.useMemo)(() => {
        return localSearch?.search(searchQuery) || [];
    }, [localSearch, searchQuery]);
    (0, react_1.useEffect)(() => {
        if (!isBrowser || !enableSearch) {
            return;
        }
        const storedQuery = localStorage.getItem(`${storageKey}-query`);
        if (storedQuery) {
            setSearchQuery(storedQuery);
        }
    }, [isBrowser, storageKey, enableSearch]);
    (0, react_1.useEffect)(() => {
        if (!isBrowser || !enableSearch) {
            return;
        }
        localStorage.setItem(`${storageKey}-query`, searchQuery);
    }, [isBrowser, searchQuery, storageKey, enableSearch]);
    const getTopLevelElms = (items) => {
        const itemsToShow = {};
        items?.forEach((childItem) => {
            const href = (0, sidebar_utils_1.isSidebarItemLink)(childItem)
                ? childItem.path
                : childItem.type === "sidebar"
                    ? getSidebarFirstLinkChild(childItem)?.path
                    : childItem.children?.find((item) => (0, sidebar_utils_1.isSidebarItemLink)(item))?.path;
            if (!href) {
                return;
            }
            itemsToShow[href] = childItem;
        });
        const itemsToShowEntries = Object.entries(itemsToShow);
        if (!itemsToShowEntries.length) {
            return react_1.default.createElement(react_1.default.Fragment, null);
        }
        return (react_1.default.createElement(__1.CardList, { items: itemsToShowEntries.map(([href, childItem]) => {
                return {
                    title: childItem.title,
                    href,
                    rightIcon: childItem.type === "ref" ? icons_1.ChevronDoubleRight : undefined,
                    text: childItem.description,
                };
            }), itemsPerRow: itemsPerRow, defaultItemsPerRow: defaultItemsPerRow }));
    };
    const getAllLevelsElms = ({ items, headerLevel = titleLevel, currentLevel = 1, }) => {
        return items?.map((item, key) => {
            const itemChildren = getChildrenForLevel({ item, currentLevel });
            const HeadingComponent = itemChildren?.length
                ? TitleHeaderComponent(headerLevel)
                : undefined;
            const linkChildren = itemChildren?.filter((item) => (0, sidebar_utils_1.isSidebarItemLink)(item) || item.type === "sidebar") || [];
            const categoryChildren = itemChildren?.filter((child) => child.type === "category" || child.type === "sub-category") || [];
            const showLinkAsCard = !HeadingComponent && (0, sidebar_utils_1.isSidebarItemLink)(item);
            return (react_1.default.createElement(react_1.default.Fragment, { key: key },
                HeadingComponent && (react_1.default.createElement(react_1.default.Fragment, null,
                    !hideTitle && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(HeadingComponent, { id: (0, slugify_1.default)(item.title.toLowerCase()) }, item.title),
                        !hideDescription && item.description && (react_1.default.createElement(__1.MarkdownContent, { allowedElements: ["a", "code", "ul", "ol", "p"] }, item.description)))),
                    linkChildren.length > 0 && (react_1.default.createElement(__1.CardList, { items: linkChildren.map((childItem) => {
                            const href = (0, sidebar_utils_1.isSidebarItemLink)(childItem)
                                ? childItem.path
                                : getSidebarFirstLinkChild(childItem)?.path;
                            return {
                                title: childItem.title,
                                href,
                                text: childItem.description,
                                rightIcon: childItem.type === "ref"
                                    ? icons_1.ChevronDoubleRight
                                    : undefined,
                            };
                        }) || [], itemsPerRow: itemsPerRow, defaultItemsPerRow: defaultItemsPerRow, className: "mb-docs_1" })),
                    categoryChildren.length > 0 &&
                        getAllLevelsElms({
                            items: categoryChildren,
                            headerLevel: headerLevel + 1,
                            currentLevel: currentLevel + 1,
                        }),
                    key !== items.length - 1 && headerLevel === 2 && react_1.default.createElement(__1.Hr, null))),
                showLinkAsCard && (react_1.default.createElement(__1.Card, { title: item.title, href: item.path, text: item.description, rightIcon: item.type === "ref" ? icons_1.ChevronDoubleRight : undefined }))));
        });
    };
    const getSearchResultElms = () => {
        const Heading = TitleHeaderComponent(titleLevel);
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Heading, null, "Search Results"),
            searchResult.length > 0 && (react_1.default.createElement(__1.CardList, { items: searchResult.map((item) => ({
                    title: item.title,
                    href: item.path,
                    text: item.description,
                    rightIcon: item.type === "ref" ? icons_1.ChevronDoubleRight : undefined,
                    highlightText: item.terms,
                })), itemsPerRow: itemsPerRow, defaultItemsPerRow: defaultItemsPerRow, className: "my-docs_2" })),
            !searchResult.length && (react_1.default.createElement("div", { className: "flex flex-col justify-center items-center gap-docs_0.75" },
                react_1.default.createElement(icons_1.ExclamationCircle, { className: "text-medusa-fg-subtle" }),
                react_1.default.createElement("span", { className: "text-compact-small-plus text-medusa-fg-base text-center" }, "No results found matching your query."),
                react_1.default.createElement("span", { className: "text-compact-small text-medusa-fg-subtle text-center" }, "Try searching with another term or clearing the search.")))));
    };
    const getElms = () => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            enableSearch && (react_1.default.createElement(__1.SearchInput, { value: searchQuery || "", onChange: setSearchQuery, ...searchProps })),
            searchQuery && getSearchResultElms(),
            !searchQuery && (react_1.default.createElement(react_1.default.Fragment, null, onlyTopLevel
                ? getTopLevelElms(filteredItems)
                : getAllLevelsElms({
                    items: filteredItems,
                })))));
    };
    return {
        items: filteredItems,
        component: getElms(),
    };
};
exports.useChildDocs = useChildDocs;
