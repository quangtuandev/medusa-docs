"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchFilters = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const providers_1 = require("../../../providers");
const SearchFilters = () => {
    const { indices, selectedIndex, setSelectedIndex } = (0, providers_1.useSearch)();
    return (react_1.default.createElement("div", { className: "pt-docs_0.75 px-docs_0.5 justify-center items-center w-full" },
        react_1.default.createElement("div", { className: "flex flex-wrap bg-medusa-bg-disabled rounded-docs_DEFAULT p-docs_0.125" }, indices.map((index) => (react_1.default.createElement("button", { key: index.value, className: (0, clsx_1.default)("text-compact-small-plus flex-1 p-docs_0.25", selectedIndex === index.value && [
                "rounded-docs_sm text-medusa-fg-base bg-medusa-bg-base",
                "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark",
            ], selectedIndex !== index.value && "text-medusa-fg-muted"), onClick: () => setSelectedIndex(index.value) }, index.title))))));
};
exports.SearchFilters = SearchFilters;
