"use client";
import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Configure, Index, Snippet, useHits, useInstantSearch, } from "react-instantsearch";
import { SearchNoResult } from "../NoResults";
import { useSearch } from "../../../providers";
import { Badge, Link, SearchHitGroupName } from "../../../components";
export const SearchHitsWrapper = ({ configureProps, ...rest }) => {
    const { status } = useInstantSearch();
    const { selectedIndex, indices } = useSearch();
    const [hasNoResults, setHasNoResults] = useState({
        [indices[0].value]: false,
        [indices[1].value]: false,
    });
    const setNoResults = (index, value) => {
        setHasNoResults((prev) => ({
            ...prev,
            [index]: value,
        }));
    };
    const showNoResults = useMemo(() => {
        return Object.values(hasNoResults).every((val) => val);
    }, [hasNoResults]);
    return (React.createElement("div", { className: "overflow-auto px-docs_0.5 flex-1" },
        status !== "loading" && showNoResults && React.createElement(SearchNoResult, null),
        indices.map((index) => (React.createElement("div", { className: clsx(index.value !== selectedIndex && "hidden"), key: index.value, "data-index": true },
            React.createElement(Index, { indexName: index.value },
                !hasNoResults[index.value] && (React.createElement(SearchHitGroupName, { name: index.title })),
                React.createElement(SearchHits, { indexName: index.value, setNoResults: setNoResults, ...rest }),
                React.createElement(Configure, { ...configureProps })))))));
};
export const SearchHits = ({ indexName, setNoResults, checkInternalPattern, }) => {
    const { items: hits, sendEvent } = useHits();
    const { status } = useInstantSearch();
    const { setIsOpen } = useSearch();
    useEffect(() => {
        if (status !== "loading" && status !== "stalled") {
            setNoResults(indexName, hits.length === 0);
        }
    }, [hits, status]);
    const checkIfInternal = (url) => {
        if (!checkInternalPattern) {
            return false;
        }
        return checkInternalPattern.test(url);
    };
    const getHierarchySnippetAttribute = (hit) => {
        let prefix = "hierarchy.";
        if (!hit._snippetResult?.hierarchy) {
            return (prefix + "lvl1");
        }
        const entries = Object.entries(hit._snippetResult.hierarchy);
        const matchedLevel = entries.find(([, value]) => value.matchLevel === "full") ||
            entries.find(([, value]) => value.matchLevel === "partial");
        if (matchedLevel) {
            prefix += matchedLevel[0];
        }
        else {
            prefix += "lvl1";
        }
        return prefix;
    };
    return (React.createElement("div", { className: clsx("overflow-auto", "[&_mark]:bg-medusa-bg-highlight", "[&_mark]:text-medusa-fg-interactive"), "data-group": true }, hits.map((item, index) => {
        const hierarchies = Object.values(item.hierarchy)
            .filter(Boolean)
            .join(" › ");
        return (React.createElement("div", { key: index, className: clsx("p-docs_0.5", "hover:bg-medusa-bg-base-hover", "focus:bg-medusa-bg-base-hover", "focus:outline-none", "flex justify-between items-center"), tabIndex: index, "data-hit": true, onClick: (e) => {
                const target = e.target;
                if (target.tagName.toLowerCase() === "div") {
                    target.querySelector("a")?.click();
                }
            } },
            React.createElement("div", { className: clsx("gap-docs_0.25 relative flex flex-1 flex-col", "overflow-x-hidden text-ellipsis whitespace-nowrap break-words") },
                React.createElement("span", { className: clsx("text-compact-small-plus text-medusa-fg-base", "max-w-full") },
                    React.createElement(Snippet, { attribute: getHierarchySnippetAttribute(item), hit: item })),
                React.createElement("span", { className: "text-compact-small text-medusa-fg-subtle text-ellipsis overflow-hidden" },
                    item.type === "content" && (React.createElement(React.Fragment, null,
                        React.createElement(Snippet, { attribute: "content", hit: item }))),
                    item.type !== "content" && item.description),
                React.createElement("span", { className: clsx("text-ellipsis overflow-hidden", "text-medusa-fg-muted items-center text-compact-x-small") }, hierarchies),
                React.createElement(Link, { href: item.url, className: "absolute top-0 left-0 h-full w-full", target: "_self", onClick: (e) => {
                        sendEvent("click", item, "Search Result Clicked");
                        if (checkIfInternal(item.url)) {
                            e.preventDefault();
                            window.location.href = item.url;
                            setIsOpen(false);
                        }
                    } })),
            !!item.integration_vendor &&
                item.integration_vendor !== "Medusa" && (React.createElement(Badge, { variant: "blue", badgeType: "shaded" }, "Community"))));
    })));
};
