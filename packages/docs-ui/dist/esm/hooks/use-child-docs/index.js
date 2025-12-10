"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardList, getLocalSearch, H2, H3, H4, Hr, MarkdownContent, SearchInput, useIsBrowser, useSidebar, } from "../..";
import slugify from "slugify";
import { MDXComponents } from "../..";
import { ChevronDoubleRight, ExclamationCircle } from "@medusajs/icons";
import { isSidebarItemLink } from "../../utils/sidebar-utils";
export const useChildDocs = ({ onlyTopLevel = false, hideItems = [], showItems, type = "sidebar", hideTitle = false, hideDescription = false, titleLevel = 2, startChildLevel = 1, endChildLevel = -1, itemsPerRow, defaultItemsPerRow, search: { enable: enableSearch = false, storageKey = "child-docs", ...searchProps } = { enable: false }, }) => {
    const { shownSidebar, activeItem, getSidebarFirstLinkChild } = useSidebar();
    const { isBrowser } = useIsBrowser();
    const [searchQuery, setSearchQuery] = useState("");
    const [localSearch, setLocalSearch] = useState();
    const TitleHeaderComponent = useCallback((level) => {
        switch (level) {
            case 3:
                return H3;
            case 4:
                return H4;
            case 5:
                return MDXComponents["h5"];
            case 6:
                return MDXComponents["h6"];
            default:
                return H2;
        }
    }, []);
    const filterType = useMemo(() => {
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
                return ((!isSidebarItemLink(item) || !hideItems.includes(item.path)) &&
                    !hideItems.includes(item.title));
            case "show":
                return ((isSidebarItemLink(item) && showItems.includes(item.path)) ||
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
    const filteredItems = useMemo(() => {
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
    const searchableItems = useMemo(() => {
        const searchableItems = [];
        if (!enableSearch) {
            return searchableItems;
        }
        if (onlyTopLevel) {
            filteredItems.forEach((item) => {
                if (isSidebarItemLink(item)) {
                    searchableItems.push(item);
                }
                else {
                    const firstChild = item.children?.find((child) => isSidebarItemLink(child));
                    if (firstChild) {
                        searchableItems.push(firstChild);
                    }
                }
            });
        }
        else {
            filteredItems?.forEach((item) => {
                const childItems = getChildrenForLevel({ item })?.filter((childItem) => {
                    return isSidebarItemLink(childItem);
                }) || [];
                searchableItems.push(...childItems);
            });
        }
        return searchableItems;
    }, [filteredItems, onlyTopLevel, enableSearch]);
    useEffect(() => {
        if (!enableSearch && localSearch) {
            setLocalSearch(undefined);
            return;
        }
        if (!enableSearch || !searchableItems?.length || localSearch) {
            return;
        }
        setLocalSearch(getLocalSearch({
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
    const searchResult = useMemo(() => {
        return localSearch?.search(searchQuery) || [];
    }, [localSearch, searchQuery]);
    useEffect(() => {
        if (!isBrowser || !enableSearch) {
            return;
        }
        const storedQuery = localStorage.getItem(`${storageKey}-query`);
        if (storedQuery) {
            setSearchQuery(storedQuery);
        }
    }, [isBrowser, storageKey, enableSearch]);
    useEffect(() => {
        if (!isBrowser || !enableSearch) {
            return;
        }
        localStorage.setItem(`${storageKey}-query`, searchQuery);
    }, [isBrowser, searchQuery, storageKey, enableSearch]);
    const getTopLevelElms = (items) => {
        const itemsToShow = {};
        items?.forEach((childItem) => {
            const href = isSidebarItemLink(childItem)
                ? childItem.path
                : childItem.type === "sidebar"
                    ? getSidebarFirstLinkChild(childItem)?.path
                    : childItem.children?.find((item) => isSidebarItemLink(item))?.path;
            if (!href) {
                return;
            }
            itemsToShow[href] = childItem;
        });
        const itemsToShowEntries = Object.entries(itemsToShow);
        if (!itemsToShowEntries.length) {
            return React.createElement(React.Fragment, null);
        }
        return (React.createElement(CardList, { items: itemsToShowEntries.map(([href, childItem]) => {
                return {
                    title: childItem.title,
                    href,
                    rightIcon: childItem.type === "ref" ? ChevronDoubleRight : undefined,
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
            const linkChildren = itemChildren?.filter((item) => isSidebarItemLink(item) || item.type === "sidebar") || [];
            const categoryChildren = itemChildren?.filter((child) => child.type === "category" || child.type === "sub-category") || [];
            const showLinkAsCard = !HeadingComponent && isSidebarItemLink(item);
            return (React.createElement(React.Fragment, { key: key },
                HeadingComponent && (React.createElement(React.Fragment, null,
                    !hideTitle && (React.createElement(React.Fragment, null,
                        React.createElement(HeadingComponent, { id: slugify(item.title.toLowerCase()) }, item.title),
                        !hideDescription && item.description && (React.createElement(MarkdownContent, { allowedElements: ["a", "code", "ul", "ol", "p"] }, item.description)))),
                    linkChildren.length > 0 && (React.createElement(CardList, { items: linkChildren.map((childItem) => {
                            const href = isSidebarItemLink(childItem)
                                ? childItem.path
                                : getSidebarFirstLinkChild(childItem)?.path;
                            return {
                                title: childItem.title,
                                href,
                                text: childItem.description,
                                rightIcon: childItem.type === "ref"
                                    ? ChevronDoubleRight
                                    : undefined,
                            };
                        }) || [], itemsPerRow: itemsPerRow, defaultItemsPerRow: defaultItemsPerRow, className: "mb-docs_1" })),
                    categoryChildren.length > 0 &&
                        getAllLevelsElms({
                            items: categoryChildren,
                            headerLevel: headerLevel + 1,
                            currentLevel: currentLevel + 1,
                        }),
                    key !== items.length - 1 && headerLevel === 2 && React.createElement(Hr, null))),
                showLinkAsCard && (React.createElement(Card, { title: item.title, href: item.path, text: item.description, rightIcon: item.type === "ref" ? ChevronDoubleRight : undefined }))));
        });
    };
    const getSearchResultElms = () => {
        const Heading = TitleHeaderComponent(titleLevel);
        return (React.createElement(React.Fragment, null,
            React.createElement(Heading, null, "Search Results"),
            searchResult.length > 0 && (React.createElement(CardList, { items: searchResult.map((item) => ({
                    title: item.title,
                    href: item.path,
                    text: item.description,
                    rightIcon: item.type === "ref" ? ChevronDoubleRight : undefined,
                    highlightText: item.terms,
                })), itemsPerRow: itemsPerRow, defaultItemsPerRow: defaultItemsPerRow, className: "my-docs_2" })),
            !searchResult.length && (React.createElement("div", { className: "flex flex-col justify-center items-center gap-docs_0.75" },
                React.createElement(ExclamationCircle, { className: "text-medusa-fg-subtle" }),
                React.createElement("span", { className: "text-compact-small-plus text-medusa-fg-base text-center" }, "No results found matching your query."),
                React.createElement("span", { className: "text-compact-small text-medusa-fg-subtle text-center" }, "Try searching with another term or clearing the search.")))));
    };
    const getElms = () => {
        return (React.createElement(React.Fragment, null,
            enableSearch && (React.createElement(SearchInput, { value: searchQuery || "", onChange: setSearchQuery, ...searchProps })),
            searchQuery && getSearchResultElms(),
            !searchQuery && (React.createElement(React.Fragment, null, onlyTopLevel
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
