import clsx from "clsx";
import React, { useMemo } from "react";
import { AiAssistantIcon, CodeMdx, DotsLoading, MarkdownContent, MDXComponents, } from "../../../components";
import { AiAssistantThreadItemActions } from "./Actions";
import { useChat } from "@kapaai/react-sdk";
export const AiAssistantThreadItem = ({ item }) => {
    const { error } = useChat();
    const showLoading = useMemo(() => {
        if (error?.length) {
            return false;
        }
        return !item.question_id && item.content.length === 0;
    }, [item, error]);
    return (React.createElement("div", { className: clsx("p-docs_0.5 flex gap-docs_0.75 items-start", item.type === "question" && "justify-end", item.type === "answer" && "!pr-[20px]") },
        item.type !== "question" && (React.createElement("span", { className: "w-[20px] block" },
            React.createElement(AiAssistantIcon, null))),
        React.createElement("div", { className: clsx("txt-small text-medusa-fg-base", "flex flex-col gap-docs_0.75", item.type !== "question" && "flex-1", item.type === "answer" && "text-pretty flex-1 max-w-[calc(100%-20px)]") },
            React.createElement("div", { className: clsx("flex flex-col gap-docs_0.75", item.type === "question" && [
                    "rounded-docs_xl bg-medusa-tag-neutral-bg",
                    "px-docs_0.75 py-docs_0.5 max-w-full md:max-w-[400px]",
                ]) },
                item.type === "question" && (React.createElement(MarkdownContent, { className: "[&>*:last-child]:mb-0", allowedElements: ["br", "p", "code", "pre"], unwrapDisallowed: true, components: {
                        ...MDXComponents,
                        code: (props) => {
                            return (React.createElement(CodeMdx, { ...props, noCopy: true, noReport: true, forceNoTitle: true, noAskAi: true, inlineCodeProps: {
                                    ...props.inlineCodeProps,
                                    className: "!text-wrap !break-words",
                                    variant: "grey-bg",
                                }, collapsibleLines: "11", codeBlockProps: {
                                    className: clsx("rounded-docs_lg p-[5px]", props.className),
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
                item.type === "answer" && (React.createElement(React.Fragment, null,
                    showLoading && React.createElement(DotsLoading, null),
                    React.createElement(MarkdownContent, { className: "[&>*:last-child]:mb-0", components: {
                            ...MDXComponents,
                            code: (props) => {
                                return (React.createElement(CodeMdx, { ...props, noReport: true, noAskAi: true, wrapperClassName: "mt-docs_1" }));
                            },
                        }, disallowedElements: ["h1", "h2", "h3", "h4", "h5", "h6"] }, item.content)))),
            (item.question_id || item.type === "question") && (React.createElement(AiAssistantThreadItemActions, { item: item })),
            item.type === "error" && (React.createElement("span", { className: "text-medusa-fg-error" }, item.content)))));
};
