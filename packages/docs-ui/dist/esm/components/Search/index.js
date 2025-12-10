"use client";
import React, { useEffect, useRef } from "react";
import { InstantSearch, SearchBox } from "react-instantsearch";
import clsx from "clsx";
import { SearchEmptyQueryBoundary } from "./EmptyQueryBoundary";
import { SearchSuggestions } from "./Suggestions";
import { useSearch } from "../../providers";
import { SearchHitsWrapper } from "./Hits";
import { SpinnerLoading } from "../../components";
import { useSearchNavigation } from "../../hooks";
import { SearchFooter } from "./Footer";
import { SearchFilters } from "./Filters";
export const Search = ({ algolia, suggestions, isLoading = false, checkInternalPattern, }) => {
    const { isOpen, searchClient, modalRef } = useSearch();
    const searchBoxRef = useRef(null);
    const focusSearchInput = () => searchBoxRef.current?.querySelector("input")?.focus();
    useEffect(() => {
        if (isOpen && searchBoxRef.current) {
            focusSearchInput();
        }
        else if (!isOpen) {
            const focusedItem = modalRef.current?.querySelector(":focus");
            if (focusedItem &&
                focusedItem === searchBoxRef.current?.querySelector("input")) {
                // remove focus
                focusedItem.blur();
            }
        }
    }, [isOpen]);
    useSearchNavigation({
        getInputElm: () => searchBoxRef.current?.querySelector("input"),
        focusInput: focusSearchInput,
        keyboardProps: {
            isLoading,
        },
    });
    return (React.createElement("div", { className: "h-full flex flex-col" },
        React.createElement(InstantSearch, { indexName: algolia.mainIndexName, searchClient: searchClient, future: {
                preserveSharedStateOnUnmount: true,
            }, insights: true },
            React.createElement("div", { className: clsx("bg-medusa-bg-base flex z-[1]") },
                React.createElement(SearchBox, { classNames: {
                        root: clsx("h-[57px] w-full md:rounded-t-docs_xl relative border-0 border-solid", "border-b border-medusa-border-base", "bg-transparent"),
                        form: clsx("h-full md:rounded-t-docs_xl bg-transparent"),
                        input: clsx("w-[calc(100%-40px)] h-full px-docs_1 py-docs_0.75 text-medusa-fg-base", "placeholder:text-medusa-fg-muted bg-medusa-bg-base", "md:rounded-t-docs_xl text-compact-large sm:text-compact-medium", "appearance-none search-cancel:hidden border-0 active:outline-none focus:outline-none"),
                        submit: clsx("absolute top-[18px] left-docs_1 btn-clear p-0"),
                        reset: clsx("absolute top-[18px] right-docs_1", "btn-clear"),
                        loadingIndicator: clsx("absolute top-[18px] right-docs_1"),
                    }, submitIconComponent: () => React.createElement(React.Fragment, null), resetIconComponent: () => (React.createElement("span", { className: "text-medusa-fg-muted text-compact-small-plus hover:text-medusa-fg-subtle" }, "Clear")), placeholder: "Find something...", autoFocus: true, formRef: searchBoxRef, loadingIconComponent: () => React.createElement(SpinnerLoading, null) })),
            React.createElement("div", { className: clsx("md:flex-initial flex flex-col", "h-[calc(100%-75px)] lg:max-h-[calc(100%-100px)] lg:min-h-[calc(100%-100px)]") },
                React.createElement(SearchFilters, null),
                React.createElement(SearchEmptyQueryBoundary, { fallback: React.createElement(SearchSuggestions, { suggestions: suggestions }) },
                    React.createElement(SearchHitsWrapper, { configureProps: {}, checkInternalPattern: checkInternalPattern })))),
        React.createElement(SearchFooter, null)));
};
