"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hr = exports.MDXComponents = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("../../components");
const clsx_1 = __importDefault(require("clsx"));
const ui_1 = require("@medusajs/ui");
exports.MDXComponents = {
    code: components_1.CodeMdx,
    kbd: components_1.Kbd,
    Kbd: components_1.Kbd,
    Note: components_1.Note,
    details: components_1.Details,
    Details: ({ className, ...props }) => {
        return react_1.default.createElement(components_1.Details, { ...props, className: (0, clsx_1.default)(className, "my-docs_1") });
    },
    Summary: components_1.DetailsSummary,
    Card: components_1.Card,
    CardList: components_1.CardList,
    h1: components_1.H1,
    h2: components_1.H2,
    h3: components_1.H3,
    h4: components_1.H4,
    p: ({ className, ...props }) => {
        return (react_1.default.createElement("p", { className: (0, clsx_1.default)("text-medusa-fg-base [&:not(:last-child)]:mb-docs_1.5 last:!mb-0", className), ...props }));
    },
    ul: ({ className, children, ...props }) => {
        return (react_1.default.createElement("ul", { ...props, className: (0, clsx_1.default)("list-disc px-docs_1 mb-docs_1.5 [&_ul]:mb-0 [&_ol]:mb-0 [&_p]:!mb-0", className) }, children));
    },
    ol: ({ className, children, ...props }) => {
        return (react_1.default.createElement("ol", { ...props, className: (0, clsx_1.default)("list-decimal px-docs_1 mb-docs_1.5 [&_ul]:mb-0 [&_ol]:mb-0 [&_p]:!mb-0", className) }, children));
    },
    li: ({ className, children, ...props }) => {
        return (react_1.default.createElement("li", { className: (0, clsx_1.default)("text-medusa-fg-base [&:not(:last-child)]:mb-docs_0.5", "[&_ol]:mt-docs_0.5 [&_ul]:mt-docs_0.5", className), ...props },
            react_1.default.createElement(ui_1.Text, { as: "span" }, children)));
    },
    hr: ({ className, ...props }) => {
        return (react_1.default.createElement("hr", { className: (0, clsx_1.default)("my-docs_2 h-[1px] w-full border-0 bg-medusa-border-base", className), ...props }));
    },
    img: (props) => {
        // omit key to resolve errors
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { key, ...rest } = props;
        return react_1.default.createElement(components_1.ZoomImg, { ...rest });
    },
    a: (props) => react_1.default.createElement(components_1.Link, { ...props, variant: "content" }),
    strong: ({ className, ...props }) => {
        return react_1.default.createElement("strong", { className: (0, clsx_1.default)("txt-medium-plus", className), ...props });
    },
};
exports.Hr = exports.MDXComponents["hr"];
