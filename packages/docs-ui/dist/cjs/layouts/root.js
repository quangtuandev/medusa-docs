"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootLayout = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../components");
const main_content_1 = require("./main-content");
const ChatWindow_1 = require("../components/AiAssistant/ChatWindow");
const TechArticleJsonLd_1 = require("../components/TechArticleJsonLd");
const RootLayout = ({ bodyClassName, sidebarProps, ProvidersComponent, ...mainProps }) => {
    return (react_1.default.createElement("body", { className: (0, clsx_1.default)("h-screen w-full overflow-hidden") },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("bg-medusa-bg-subtle font-base text-medium w-full", "text-medusa-fg-base", "h-full overflow-hidden", "grid grid-cols-1 lg:mx-auto lg:grid-cols-[221px_1fr]", bodyClassName), id: "root-layout" },
            react_1.default.createElement(components_1.RootProviders, null,
                react_1.default.createElement(ProvidersComponent, null,
                    react_1.default.createElement(components_1.Sidebar, { ...sidebarProps }),
                    react_1.default.createElement("div", { className: (0, clsx_1.default)("relative", "h-screen", "flex") },
                        react_1.default.createElement(main_content_1.MainContentLayout, { ...mainProps }),
                        react_1.default.createElement(ChatWindow_1.AiAssistantChatWindow, null)),
                    react_1.default.createElement(TechArticleJsonLd_1.TechArticleJsonLd, null))))));
};
exports.RootLayout = RootLayout;
