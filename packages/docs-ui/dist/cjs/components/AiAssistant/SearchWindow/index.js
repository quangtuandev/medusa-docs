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
exports.AiAssistantSearchWindow = void 0;
const react_1 = __importStar(require("react"));
const components_1 = require("../../../components");
const providers_1 = require("../../../providers");
const icons_1 = require("@medusajs/icons");
const clsx_1 = __importDefault(require("clsx"));
const ThreadItem_1 = require("../ThreadItem");
const Suggestions_1 = require("../Suggestions");
const __1 = require("../../..");
const react_sdk_1 = require("@kapaai/react-sdk");
const AiAssistantSearchWindow = () => {
    const { conversation, submitQuery, error } = (0, react_sdk_1.useChat)();
    const { inputRef, contentRef, loading } = (0, providers_1.useAiAssistant)();
    const [question, setQuestion] = (0, react_1.useState)("");
    const { setCommand } = (0, providers_1.useSearch)();
    const getThreadItems = (0, react_1.useCallback)(() => {
        return conversation.map((item, index) => (react_1.default.createElement(react_1.Fragment, { key: index },
            react_1.default.createElement(ThreadItem_1.AiAssistantThreadItem, { item: {
                    type: "question",
                    content: item.question,
                    sources: item.sources,
                    question_id: item.id,
                } }),
            react_1.default.createElement(ThreadItem_1.AiAssistantThreadItem, { item: {
                    type: "answer",
                    content: item.answer,
                    sources: item.sources,
                    question_id: item.id,
                } }))));
    }, [conversation]);
    (0, __1.useSearchNavigation)({
        getInputElm: () => inputRef.current,
        focusInput: () => inputRef.current?.focus(),
        handleSubmit: () => {
            if (question.length > 0) {
                submitQuery(question);
            }
        },
    });
    return (react_1.default.createElement("div", { className: "h-full" },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("px-docs_1 pt-docs_1") },
            react_1.default.createElement(components_1.Tooltip, { tooltipChildren: react_1.default.createElement(react_1.default.Fragment, null,
                    "This site is protected by reCAPTCHA and the",
                    " ",
                    react_1.default.createElement(components_1.Link, { href: "https://policies.google.com/privacy" }, "Google Privacy Policy"),
                    " ",
                    "and ",
                    react_1.default.createElement(components_1.Link, { href: "https://policies.google.com/terms" }, "ToS"),
                    " ",
                    "apply"), clickable: true },
                react_1.default.createElement(components_1.Badge, { variant: "neutral" }, "AI Assistant"))),
        react_1.default.createElement("div", { className: (0, clsx_1.default)("flex gap-docs_1 px-docs_1 py-docs_0.75", "h-[57px] w-full md:rounded-t-docs_xl relative border-0 border-solid", "border-b border-medusa-border-base relative") },
            react_1.default.createElement(components_1.Button, { variant: "transparent", onClick: () => setCommand(null), className: "text-medusa-fg-muted p-[6.5px]" },
                react_1.default.createElement(icons_1.ArrowUturnLeft, null)),
            react_1.default.createElement(components_1.InputText, { value: question, onChange: (e) => setQuestion(e.target.value), className: (0, clsx_1.default)("bg-transparent border-0 focus:outline-none hover:!bg-transparent", "!shadow-none flex-1 text-medusa-fg-base", "disabled:!bg-transparent disabled:cursor-not-allowed"), placeholder: "Ask me a question about Medusa...", autoFocus: true, passedRef: inputRef, disabled: loading }),
            react_1.default.createElement("span", { onClick: () => {
                    setQuestion("");
                    inputRef.current?.focus();
                }, className: (0, clsx_1.default)("text-medusa-fg-muted hover:text-medusa-fg-subtle", "absolute top-docs_0.75 right-docs_1", "cursor-pointer", question.length === 0 && "hidden") }, "Clear")),
        react_1.default.createElement("div", { className: "h-[calc(100%-95px)] lg:max-h-[calc(100%-140px)] lg:min-h-[calc(100%-140px)] overflow-auto" },
            react_1.default.createElement("div", { ref: contentRef },
                !conversation.length && (react_1.default.createElement(Suggestions_1.AiAssistantSuggestions, { className: "mx-docs_0.5" })),
                getThreadItems(),
                error?.length && (react_1.default.createElement(ThreadItem_1.AiAssistantThreadItem, { item: {
                        type: "error",
                        content: error,
                    } })))),
        react_1.default.createElement("div", { className: (0, clsx_1.default)("py-docs_0.75 hidden md:flex items-center justify-end px-docs_1", "border-medusa-border-base border-t", "bg-medusa-bg-field-component") },
            react_1.default.createElement("div", { className: "flex items-center gap-docs_0.75" },
                react_1.default.createElement("div", { className: "flex items-center gap-docs_0.5" },
                    conversation.length === 0 && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-subtle", "text-compact-x-small") }, "Navigate FAQ"),
                        react_1.default.createElement("span", { className: "gap-[5px] flex" },
                            react_1.default.createElement(components_1.Kbd, { className: (0, clsx_1.default)("!bg-medusa-bg-field-component !border-medusa-border-strong", "!text-medusa-fg-subtle h-[18px] w-[18px] p-0") }, "\u2191"),
                            react_1.default.createElement(components_1.Kbd, { className: (0, clsx_1.default)("!bg-medusa-bg-field-component !border-medusa-border-strong", "!text-medusa-fg-subtle h-[18px] w-[18px] p-0") }, "\u2193")))),
                    conversation.length > 0 && (react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-muted", "text-compact-x-small") }, "Chat is cleared on exit"))),
                react_1.default.createElement("div", { className: (0, clsx_1.default)("h-docs_0.75 w-px bg-medusa-border-strong") }),
                react_1.default.createElement("div", { className: "flex items-center gap-docs_0.5" },
                    react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-subtle", "text-compact-x-small") }, "Ask Question"),
                    react_1.default.createElement(components_1.Kbd, { className: (0, clsx_1.default)("!bg-medusa-bg-field-component !border-medusa-border-strong", "!text-medusa-fg-subtle h-[18px] w-[18px] p-0") }, "\u21B5"))))));
};
exports.AiAssistantSearchWindow = AiAssistantSearchWindow;
