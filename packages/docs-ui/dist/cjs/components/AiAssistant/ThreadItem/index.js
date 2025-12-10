"use strict";
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
exports.AiAssistantThreadItem = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const components_1 = require("../../../components");
const Actions_1 = require("./Actions");
const react_sdk_1 = require("@kapaai/react-sdk");
const AiAssistantThreadItem = ({ item }) => {
    const { error } = (0, react_sdk_1.useChat)();
    const showLoading = (0, react_1.useMemo)(() => {
        if (error?.length) {
            return false;
        }
        return !item.question_id && item.content.length === 0;
    }, [item, error]);
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("p-docs_0.5 flex gap-docs_0.75 items-start", item.type === "question" && "justify-end", item.type === "answer" && "!pr-[20px]") },
        item.type !== "question" && (react_1.default.createElement("span", { className: "w-[20px] block" },
            react_1.default.createElement(components_1.AiAssistantIcon, null))),
        react_1.default.createElement("div", { className: (0, clsx_1.default)("txt-small text-medusa-fg-base", "flex flex-col gap-docs_0.75", item.type !== "question" && "flex-1", item.type === "answer" && "text-pretty flex-1 max-w-[calc(100%-20px)]") },
            react_1.default.createElement("div", { className: (0, clsx_1.default)("flex flex-col gap-docs_0.75", item.type === "question" && [
                    "rounded-docs_xl bg-medusa-tag-neutral-bg",
                    "px-docs_0.75 py-docs_0.5 max-w-full md:max-w-[400px]",
                ]) },
                item.type === "question" && (react_1.default.createElement(components_1.MarkdownContent, { className: "[&>*:last-child]:mb-0", allowedElements: ["br", "p", "code", "pre"], unwrapDisallowed: true, components: {
                        ...components_1.MDXComponents,
                        code: (props) => {
                            return (react_1.default.createElement(components_1.CodeMdx, { ...props, noCopy: true, noReport: true, forceNoTitle: true, noAskAi: true, inlineCodeProps: {
                                    ...props.inlineCodeProps,
                                    className: "!text-wrap !break-words",
                                    variant: "grey-bg",
                                }, collapsibleLines: "11", codeBlockProps: {
                                    className: (0, clsx_1.default)("rounded-docs_lg p-[5px]", props.className),
                                    wrapperClassName: "rounded-docs_lg",
                                    innerClassName: "border rounded-docs_lg",
                                    overrideColors: {
                                        bg: "bg-medusa-contrast-bg-subtle",
                                        innerBg: "bg-medusa-contrast-bg-subtle",
                                        innerBorder: "border-medusa-contrast-border-bot",
                                    },
                                } }));
                        },
                    } }, item.content)),
                item.type === "answer" && (react_1.default.createElement(react_1.default.Fragment, null,
                    showLoading && react_1.default.createElement(components_1.DotsLoading, null),
                    react_1.default.createElement(components_1.MarkdownContent, { className: "[&>*:last-child]:mb-0", components: {
                            ...components_1.MDXComponents,
                            code: (props) => {
                                return (react_1.default.createElement(components_1.CodeMdx, { ...props, noReport: true, noAskAi: true, wrapperClassName: "mt-docs_1" }));
                            },
                        }, disallowedElements: ["h1", "h2", "h3", "h4", "h5", "h6"] }, item.content)))),
            (item.question_id || item.type === "question") && (react_1.default.createElement(Actions_1.AiAssistantThreadItemActions, { item: item })),
            item.type === "error" && (react_1.default.createElement("span", { className: "text-medusa-fg-error" }, item.content)))));
};
exports.AiAssistantThreadItem = AiAssistantThreadItem;
