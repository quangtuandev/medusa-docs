"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAssistantSuggestions = void 0;
const react_1 = __importDefault(require("react"));
const GroupName_1 = require("../../Search/Hits/GroupName");
const Item_1 = require("../../Search/Suggestions/Item");
const react_sdk_1 = require("@kapaai/react-sdk");
const Link_1 = require("../../Link");
const providers_1 = require("../../../providers");
const AiAssistantSuggestions = (props) => {
    const { config: { baseUrl }, } = (0, providers_1.useSiteConfig)();
    const { submitQuery } = (0, react_sdk_1.useChat)();
    const suggestions = [
        {
            title: "FAQ",
            items: [
                "What is Medusa?",
                "How can I create a module?",
                "How can I create a data model?",
                "How do I create a workflow?",
                "How can I extend a data model in the Product Module?",
            ],
        },
        {
            title: "Recipes",
            items: [
                "How do I build a marketplace with Medusa?",
                "How do I build digital products with Medusa?",
                "How do I build subscription-based purchases with Medusa?",
                "What other recipes are available in the Medusa documentation?",
            ],
        },
    ];
    return (react_1.default.createElement("div", { ...props },
        react_1.default.createElement("span", { className: "text-medusa-fg-muted text-compact-small px-docs_0.5 py-docs_0.75 block" },
            "Ask any questions about Medusa. Get help with your development.",
            react_1.default.createElement("br", null),
            "You can also use the",
            " ",
            react_1.default.createElement(Link_1.Link, { href: `${baseUrl}/learn/introduction/build-with-llms-ai#mcp-remote-server`, variant: "content" }, "Medusa MCP server"),
            " ",
            "in Cursor, VSCode, etc..."),
        suggestions.map((suggestion, index) => (react_1.default.createElement(react_1.default.Fragment, { key: index },
            react_1.default.createElement(GroupName_1.SearchHitGroupName, { name: suggestion.title }),
            suggestion.items.map((item, itemIndex) => (react_1.default.createElement(Item_1.SearchSuggestionItem, { onClick: () => {
                    submitQuery(item);
                }, key: itemIndex, tabIndex: itemIndex }, item))))))));
};
exports.AiAssistantSuggestions = AiAssistantSuggestions;
