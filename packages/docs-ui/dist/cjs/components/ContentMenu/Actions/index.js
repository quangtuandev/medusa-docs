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
exports.ContentMenuActions = void 0;
const link_1 = __importDefault(require("next/link"));
const react_1 = __importStar(require("react"));
const Markdown_1 = require("../../Icons/Markdown");
const providers_1 = require("../../../providers");
const navigation_1 = require("next/navigation");
const icons_1 = require("@medusajs/icons");
const react_sdk_1 = require("@kapaai/react-sdk");
const ContentMenuActions = () => {
    const { config: { baseUrl, basePath }, } = (0, providers_1.useSiteConfig)();
    const pathname = (0, navigation_1.usePathname)();
    const { setChatOpened } = (0, providers_1.useAiAssistant)();
    const { isGeneratingAnswer, isPreparingAnswer, submitQuery } = (0, react_sdk_1.useChat)();
    const loading = (0, react_1.useMemo)(() => isGeneratingAnswer || isPreparingAnswer, [isGeneratingAnswer, isPreparingAnswer]);
    const pageUrl = `${baseUrl}${basePath}${pathname}`;
    const handleAiAssistantClick = () => {
        if (loading) {
            return;
        }
        submitQuery(`Explain the page ${pageUrl}`);
        setChatOpened(true);
    };
    return (react_1.default.createElement("div", { className: "flex flex-col gap-docs_0.5" },
        react_1.default.createElement(link_1.default, { className: "flex items-center gap-docs_0.5 text-medusa-fg-subtle text-x-small-plus hover:text-medusa-fg-base", href: `${pageUrl}/index.html.md` },
            react_1.default.createElement(Markdown_1.MarkdownIcon, { width: 15, height: 15 }),
            "View as Markdown"),
        react_1.default.createElement("button", { className: "appearance-none p-0 flex items-center gap-docs_0.5 text-medusa-fg-subtle text-x-small-plus hover:text-medusa-fg-base", onClick: handleAiAssistantClick },
            react_1.default.createElement(icons_1.BroomSparkle, { width: 15, height: 15 }),
            "Explain with AI Assistant")));
};
exports.ContentMenuActions = ContentMenuActions;
