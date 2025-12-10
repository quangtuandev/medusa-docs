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
exports.AiAssistantThreadItemActions = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../../../components");
const icons_1 = require("@medusajs/icons");
const providers_1 = require("../../../../providers");
const react_sdk_1 = require("@kapaai/react-sdk");
const hooks_1 = require("../../../../hooks");
const AiAssistantThreadItemActions = ({ item, }) => {
    const [feedback, setFeedback] = (0, react_1.useState)(null);
    const { addFeedback } = (0, react_sdk_1.useChat)();
    const { config: { baseUrl }, } = (0, providers_1.useSiteConfig)();
    const { handleCopy: handleLinkCopy, isCopied: isLinkCopied } = (0, hooks_1.useCopy)(`${baseUrl}?query=${encodeURI(item.content)}`);
    const { handleCopy: handleAnswerCopy, isCopied: isAnswerCopied } = (0, hooks_1.useCopy)(item.content);
    const handleFeedback = async (reaction, question_id) => {
        try {
            if (!question_id || feedback) {
                return;
            }
            setFeedback(reaction);
            addFeedback(question_id, reaction);
        }
        catch (error) {
            console.error("Error sending feedback:", error);
        }
    };
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex gap-docs_0.75 items-center", item.type === "question" && "justify-end", item.type === "answer" && "justify-between") },
        item.type === "question" && (react_1.default.createElement("div", { className: "flex gap-docs_0.25 items-center text-medusa-fg-muted" },
            react_1.default.createElement(ActionButton, { onClick: handleLinkCopy }, isLinkCopied ? react_1.default.createElement(icons_1.CheckCircle, null) : react_1.default.createElement(icons_1.Link, null)))),
        item.type === "answer" && (react_1.default.createElement(react_1.default.Fragment, null,
            item.sources !== undefined && item.sources.length > 0 && (react_1.default.createElement("div", { className: "flex gap-[6px] items-center flex-wrap" }, item.sources.map((source) => (react_1.default.createElement(components_1.Badge, { key: source.source_url, variant: "neutral" },
                react_1.default.createElement(components_1.Link, { href: source.source_url, className: "!text-inherit" }, source.title)))))),
            react_1.default.createElement("div", { className: "flex gap-docs_0.25 items-center text-medusa-fg-muted" },
                react_1.default.createElement(ActionButton, { onClick: handleAnswerCopy }, isAnswerCopied ? react_1.default.createElement(icons_1.CheckCircle, null) : react_1.default.createElement(icons_1.SquareTwoStack, null)),
                (feedback === null || feedback === "upvote") && (react_1.default.createElement(ActionButton, { onClick: async () => handleFeedback("upvote", item.question_id), className: (0, clsx_1.default)(feedback === "upvote" && "!text-medusa-fg-muted") },
                    react_1.default.createElement(icons_1.ThumbUp, null))),
                (feedback === null || feedback === "downvote") && (react_1.default.createElement(ActionButton, { onClick: async () => handleFeedback("downvote", item.question_id), className: (0, clsx_1.default)(feedback === "downvote" && "!text-medusa-fg-muted") },
                    react_1.default.createElement(icons_1.ThumbDown, null))))))));
};
exports.AiAssistantThreadItemActions = AiAssistantThreadItemActions;
const ActionButton = ({ children, className, ...props }) => {
    return (react_1.default.createElement(components_1.Button, { variant: "transparent", className: (0, clsx_1.default)("text-medusa-fg-muted hover:text-medusa-fg-muted", "hover:bg-medusa-bg-subtle-hover", "!p-[4.5px] rounded-docs_sm", className), ...props }, children));
};
