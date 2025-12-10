"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownContent = void 0;
const react_1 = __importDefault(require("react"));
const react_markdown_1 = __importDefault(require("react-markdown"));
const components_1 = require("../../components");
const clsx_1 = __importDefault(require("clsx"));
const MarkdownContent = ({ children, components, ...props }) => {
    return (
    // @ts-expect-error React v19 doesn't see this type as a React element
    react_1.default.createElement(react_markdown_1.default, { components: components || {
            ...components_1.MDXComponents,
            pre: ({ className, children, ...props }) => {
                return (react_1.default.createElement("pre", { className: (0, clsx_1.default)("p-0 bg-transparent", className), ...props }, children));
            },
        }, ...props }, children));
};
exports.MarkdownContent = MarkdownContent;
