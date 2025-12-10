"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchSuggestionItem = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const SearchSuggestionItem = ({ children, onClick, className, ...rest }) => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex items-center justify-between gap-docs_0.75", "cursor-pointer rounded-docs_sm p-docs_0.5", "hover:bg-medusa-bg-base-hover", "focus:bg-medusa-bg-base-hover", "focus:outline-none last:mb-docs_1", "text-medusa-fg-base text-compact-small", className), onClick: onClick, "data-hit": true, ...rest }, children));
};
exports.SearchSuggestionItem = SearchSuggestionItem;
