"use client";
import React from "react";
import { SearchHitGroupName } from "../../Search/Hits/GroupName";
import { SearchSuggestionItem } from "../../Search/Suggestions/Item";
import { useChat } from "@kapaai/react-sdk";
import { Link } from "../../Link";
import { useSiteConfig } from "../../../providers";
export const AiAssistantSuggestions = (props) => {
    const { config: { baseUrl }, } = useSiteConfig();
    const { submitQuery } = useChat();
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
    return (React.createElement("div", { ...props },
        React.createElement("span", { className: "text-medusa-fg-muted text-compact-small px-docs_0.5 py-docs_0.75 block" },
            "Ask any questions about Medusa. Get help with your development.",
            React.createElement("br", null),
            "You can also use the",
            " ",
            React.createElement(Link, { href: `${baseUrl}/learn/introduction/build-with-llms-ai#mcp-remote-server`, variant: "content" }, "Medusa MCP server"),
            " ",
            "in Cursor, VSCode, etc..."),
        suggestions.map((suggestion, index) => (React.createElement(React.Fragment, { key: index },
            React.createElement(SearchHitGroupName, { name: suggestion.title }),
            suggestion.items.map((item, itemIndex) => (React.createElement(SearchSuggestionItem, { onClick: () => {
                    submitQuery(item);
                }, key: itemIndex, tabIndex: itemIndex }, item))))))));
};
