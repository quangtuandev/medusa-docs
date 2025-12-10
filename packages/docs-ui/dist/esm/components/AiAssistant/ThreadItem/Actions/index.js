import React, { useState } from "react";
import clsx from "clsx";
import { Badge, Button, Link } from "../../../../components";
import { ThumbDown, ThumbUp, Link as LinkIcon, CheckCircle, SquareTwoStack, } from "@medusajs/icons";
import { useSiteConfig, } from "../../../../providers";
import { useChat } from "@kapaai/react-sdk";
import { useCopy } from "../../../../hooks";
export const AiAssistantThreadItemActions = ({ item, }) => {
    const [feedback, setFeedback] = useState(null);
    const { addFeedback } = useChat();
    const { config: { baseUrl }, } = useSiteConfig();
    const { handleCopy: handleLinkCopy, isCopied: isLinkCopied } = useCopy(`${baseUrl}?query=${encodeURI(item.content)}`);
    const { handleCopy: handleAnswerCopy, isCopied: isAnswerCopied } = useCopy(item.content);
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
    return (React.createElement("div", { className: clsx("flex gap-docs_0.75 items-center", item.type === "question" && "justify-end", item.type === "answer" && "justify-between") },
        item.type === "question" && (React.createElement("div", { className: "flex gap-docs_0.25 items-center text-medusa-fg-muted" },
            React.createElement(ActionButton, { onClick: handleLinkCopy }, isLinkCopied ? React.createElement(CheckCircle, null) : React.createElement(LinkIcon, null)))),
        item.type === "answer" && (React.createElement(React.Fragment, null,
            item.sources !== undefined && item.sources.length > 0 && (React.createElement("div", { className: "flex gap-[6px] items-center flex-wrap" }, item.sources.map((source) => (React.createElement(Badge, { key: source.source_url, variant: "neutral" },
                React.createElement(Link, { href: source.source_url, className: "!text-inherit" }, source.title)))))),
            React.createElement("div", { className: "flex gap-docs_0.25 items-center text-medusa-fg-muted" },
                React.createElement(ActionButton, { onClick: handleAnswerCopy }, isAnswerCopied ? React.createElement(CheckCircle, null) : React.createElement(SquareTwoStack, null)),
                (feedback === null || feedback === "upvote") && (React.createElement(ActionButton, { onClick: async () => handleFeedback("upvote", item.question_id), className: clsx(feedback === "upvote" && "!text-medusa-fg-muted") },
                    React.createElement(ThumbUp, null))),
                (feedback === null || feedback === "downvote") && (React.createElement(ActionButton, { onClick: async () => handleFeedback("downvote", item.question_id), className: clsx(feedback === "downvote" && "!text-medusa-fg-muted") },
                    React.createElement(ThumbDown, null))))))));
};
const ActionButton = ({ children, className, ...props }) => {
    return (React.createElement(Button, { variant: "transparent", className: clsx("text-medusa-fg-muted hover:text-medusa-fg-muted", "hover:bg-medusa-bg-subtle-hover", "!p-[4.5px] rounded-docs_sm", className), ...props }, children));
};
