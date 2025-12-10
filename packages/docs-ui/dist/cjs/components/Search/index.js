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
exports.Search = void 0;
const react_1 = __importStar(require("react"));
const react_instantsearch_1 = require("react-instantsearch");
const clsx_1 = __importDefault(require("clsx"));
const EmptyQueryBoundary_1 = require("./EmptyQueryBoundary");
const Suggestions_1 = require("./Suggestions");
const providers_1 = require("../../providers");
const Hits_1 = require("./Hits");
const components_1 = require("../../components");
const hooks_1 = require("../../hooks");
const Footer_1 = require("./Footer");
const Filters_1 = require("./Filters");
const Search = ({ algolia, suggestions, isLoading = false, checkInternalPattern, }) => {
    const { isOpen, searchClient, modalRef } = (0, providers_1.useSearch)();
    const searchBoxRef = (0, react_1.useRef)(null);
    const focusSearchInput = () => searchBoxRef.current?.querySelector("input")?.focus();
    (0, react_1.useEffect)(() => {
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
    (0, hooks_1.useSearchNavigation)({
        getInputElm: () => searchBoxRef.current?.querySelector("input"),
        focusInput: focusSearchInput,
        keyboardProps: {
            isLoading,
        },
    });
    return (react_1.default.createElement("div", { className: "h-full flex flex-col" },
        react_1.default.createElement(react_instantsearch_1.InstantSearch, { indexName: algolia.mainIndexName, searchClient: searchClient, future: {
                preserveSharedStateOnUnmount: true,
            }, insights: true },
            react_1.default.createElement("div", { className: (0, clsx_1.default)("bg-medusa-bg-base flex z-[1]") },
                react_1.default.createElement(react_instantsearch_1.SearchBox, { classNames: {
                        root: (0, clsx_1.default)("h-[57px] w-full md:rounded-t-docs_xl relative border-0 border-solid", "border-b border-medusa-border-base", "bg-transparent"),
                        form: (0, clsx_1.default)("h-full md:rounded-t-docs_xl bg-transparent"),
                        input: (0, clsx_1.default)("w-[calc(100%-40px)] h-full px-docs_1 py-docs_0.75 text-medusa-fg-base", "placeholder:text-medusa-fg-muted bg-medusa-bg-base", "md:rounded-t-docs_xl text-compact-large sm:text-compact-medium", "appearance-none search-cancel:hidden border-0 active:outline-none focus:outline-none"),
                        submit: (0, clsx_1.default)("absolute top-[18px] left-docs_1 btn-clear p-0"),
                        reset: (0, clsx_1.default)("absolute top-[18px] right-docs_1", "btn-clear"),
                        loadingIndicator: (0, clsx_1.default)("absolute top-[18px] right-docs_1"),
                    }, submitIconComponent: () => react_1.default.createElement(react_1.default.Fragment, null), resetIconComponent: () => (react_1.default.createElement("span", { className: "text-medusa-fg-muted text-compact-small-plus hover:text-medusa-fg-subtle" }, "Clear")), placeholder: "Find something...", autoFocus: true, formRef: searchBoxRef, loadingIconComponent: () => react_1.default.createElement(components_1.SpinnerLoading, null) })),
            react_1.default.createElement("div", { className: (0, clsx_1.default)("md:flex-initial flex flex-col", "h-[calc(100%-75px)] lg:max-h-[calc(100%-100px)] lg:min-h-[calc(100%-100px)]") },
                react_1.default.createElement(Filters_1.SearchFilters, null),
                react_1.default.createElement(EmptyQueryBoundary_1.SearchEmptyQueryBoundary, { fallback: react_1.default.createElement(Suggestions_1.SearchSuggestions, { suggestions: suggestions }) },
                    react_1.default.createElement(Hits_1.SearchHitsWrapper, { configureProps: {}, checkInternalPattern: checkInternalPattern })))),
        react_1.default.createElement(Footer_1.SearchFooter, null)));
};
exports.Search = Search;
