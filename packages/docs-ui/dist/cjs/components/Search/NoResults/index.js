"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchNoResult = void 0;
const icons_1 = require("@medusajs/icons");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const SearchNoResult = () => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex h-full w-full flex-col items-center justify-center gap-docs_0.75") },
        react_1.default.createElement(icons_1.MagnifierAlert, { className: "text-medusa-fg-base" }),
        react_1.default.createElement("div", { className: (0, clsx_1.default)("flex flex-col justify-center items-center gap-docs_0.25", "max-w-[360px]") },
            react_1.default.createElement("span", { className: "text-compact-small-plus text-medusa-fg-subtle" }, "No results found."),
            react_1.default.createElement("span", { className: "text-medusa-fg-muted txt-small text-center" }, "We couldn't find any matches for your search. Please try changing the filters or using different keywords."))));
};
exports.SearchNoResult = SearchNoResult;
