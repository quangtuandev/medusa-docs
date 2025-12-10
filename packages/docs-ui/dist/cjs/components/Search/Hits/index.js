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
exports.SearchHits = exports.SearchHitsWrapper = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const react_instantsearch_1 = require("react-instantsearch");
const NoResults_1 = require("../NoResults");
const providers_1 = require("../../../providers");
const components_1 = require("../../../components");
const SearchHitsWrapper = ({ configureProps, ...rest }) => {
    const { status } = (0, react_instantsearch_1.useInstantSearch)();
    const { selectedIndex, indices } = (0, providers_1.useSearch)();
    const [hasNoResults, setHasNoResults] = (0, react_1.useState)({
        [indices[0].value]: false,
        [indices[1].value]: false,
    });
    const setNoResults = (index, value) => {
        setHasNoResults((prev) => ({
            ...prev,
            [index]: value,
        }));
    };
    const showNoResults = (0, react_1.useMemo)(() => {
        return Object.values(hasNoResults).every((val) => val);
    }, [hasNoResults]);
    return (react_1.default.createElement("div", { className: "overflow-auto px-docs_0.5 flex-1" },
        status !== "loading" && showNoResults && react_1.default.createElement(NoResults_1.SearchNoResult, null),
        indices.map((index) => (react_1.default.createElement("div", { className: (0, clsx_1.default)(index.value !== selectedIndex && "hidden"), key: index.value, "data-index": true },
            react_1.default.createElement(react_instantsearch_1.Index, { indexName: index.value },
                !hasNoResults[index.value] && (react_1.default.createElement(components_1.SearchHitGroupName, { name: index.title })),
                react_1.default.createElement(exports.SearchHits, { indexName: index.value, setNoResults: setNoResults, ...rest }),
                react_1.default.createElement(react_instantsearch_1.Configure, { ...configureProps })))))));
};
exports.SearchHitsWrapper = SearchHitsWrapper;
const SearchHits = ({ indexName, setNoResults, checkInternalPattern, }) => {
    const { items: hits, sendEvent } = (0, react_instantsearch_1.useHits)();
    const { status } = (0, react_instantsearch_1.useInstantSearch)();
    const { setIsOpen } = (0, providers_1.useSearch)();
    (0, react_1.useEffect)(() => {
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
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("overflow-auto", "[&_mark]:bg-medusa-bg-highlight", "[&_mark]:text-medusa-fg-interactive"), "data-group": true }, hits.map((item, index) => {
        const hierarchies = Object.values(item.hierarchy)
            .filter(Boolean)
            .join(" › ");
        return (react_1.default.createElement("div", { key: index, className: (0, clsx_1.default)("p-docs_0.5", "hover:bg-medusa-bg-base-hover", "focus:bg-medusa-bg-base-hover", "focus:outline-none", "flex justify-between items-center"), tabIndex: index, "data-hit": true, onClick: (e) => {
                const target = e.target;
                if (target.tagName.toLowerCase() === "div") {
                    target.querySelector("a")?.click();
                }
            } },
            react_1.default.createElement("div", { className: (0, clsx_1.default)("gap-docs_0.25 relative flex flex-1 flex-col", "overflow-x-hidden text-ellipsis whitespace-nowrap break-words") },
                react_1.default.createElement("span", { className: (0, clsx_1.default)("text-compact-small-plus text-medusa-fg-base", "max-w-full") },
                    react_1.default.createElement(react_instantsearch_1.Snippet, { attribute: getHierarchySnippetAttribute(item), hit: item })),
                react_1.default.createElement("span", { className: "text-compact-small text-medusa-fg-subtle text-ellipsis overflow-hidden" },
                    item.type === "content" && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(react_instantsearch_1.Snippet, { attribute: "content", hit: item }))),
                    item.type !== "content" && item.description),
                react_1.default.createElement("span", { className: (0, clsx_1.default)("text-ellipsis overflow-hidden", "text-medusa-fg-muted items-center text-compact-x-small") }, hierarchies),
                react_1.default.createElement(components_1.Link, { href: item.url, className: "absolute top-0 left-0 h-full w-full", target: "_self", onClick: (e) => {
                        sendEvent("click", item, "Search Result Clicked");
                        if (checkIfInternal(item.url)) {
                            e.preventDefault();
                            window.location.href = item.url;
                            setIsOpen(false);
                        }
                    } })),
            !!item.integration_vendor &&
                item.integration_vendor !== "Medusa" && (react_1.default.createElement(components_1.Badge, { variant: "blue", badgeType: "shaded" }, "Community"))));
    })));
};
exports.SearchHits = SearchHits;
