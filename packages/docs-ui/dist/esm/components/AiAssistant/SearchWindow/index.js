"use client";
import React, { Fragment, useCallback, useState } from "react";
import { Badge, Button, InputText, Kbd, Tooltip, Link } from "../../../components";
import { useAiAssistant, useSearch } from "../../../providers";
import { ArrowUturnLeft } from "@medusajs/icons";
import clsx from "clsx";
import { AiAssistantThreadItem } from "../ThreadItem";
import { AiAssistantSuggestions } from "../Suggestions";
import { useSearchNavigation } from "../../..";
import { useChat } from "@kapaai/react-sdk";
export const AiAssistantSearchWindow = () => {
    const { conversation, submitQuery, error } = useChat();
    const { inputRef, contentRef, loading } = useAiAssistant();
    const [question, setQuestion] = useState("");
    const { setCommand } = useSearch();
    const getThreadItems = useCallback(() => {
        return conversation.map((item, index) => (React.createElement(Fragment, { key: index },
            React.createElement(AiAssistantThreadItem, { item: {
                    type: "question",
                    content: item.question,
                    sources: item.sources,
                    question_id: item.id,
                } }),
            React.createElement(AiAssistantThreadItem, { item: {
                    type: "answer",
                    content: item.answer,
                    sources: item.sources,
                    question_id: item.id,
                } }))));
    }, [conversation]);
    useSearchNavigation({
        getInputElm: () => inputRef.current,
        focusInput: () => inputRef.current?.focus(),
        handleSubmit: () => {
            if (question.length > 0) {
                submitQuery(question);
            }
        },
    });
    return (React.createElement("div", { className: "h-full" },
        React.createElement("div", { className: clsx("px-docs_1 pt-docs_1") },
            React.createElement(Tooltip, { tooltipChildren: React.createElement(React.Fragment, null,
                    "This site is protected by reCAPTCHA and the",
                    " ",
                    React.createElement(Link, { href: "https://policies.google.com/privacy" }, "Google Privacy Policy"),
                    " ",
                    "and ",
                    React.createElement(Link, { href: "https://policies.google.com/terms" }, "ToS"),
                    " ",
                    "apply"), clickable: true },
                React.createElement(Badge, { variant: "neutral" }, "AI Assistant"))),
        React.createElement("div", { className: clsx("flex gap-docs_1 px-docs_1 py-docs_0.75", "h-[57px] w-full md:rounded-t-docs_xl relative border-0 border-solid", "border-b border-medusa-border-base relative") },
            React.createElement(Button, { variant: "transparent", onClick: () => setCommand(null), className: "text-medusa-fg-muted p-[6.5px]" },
                React.createElement(ArrowUturnLeft, null)),
            React.createElement(InputText, { value: question, onChange: (e) => setQuestion(e.target.value), className: clsx("bg-transparent border-0 focus:outline-none hover:!bg-transparent", "!shadow-none flex-1 text-medusa-fg-base", "disabled:!bg-transparent disabled:cursor-not-allowed"), placeholder: "Ask me a question about Medusa...", autoFocus: true, passedRef: inputRef, disabled: loading }),
            React.createElement("span", { onClick: () => {
                    setQuestion("");
                    inputRef.current?.focus();
                }, className: clsx("text-medusa-fg-muted hover:text-medusa-fg-subtle", "absolute top-docs_0.75 right-docs_1", "cursor-pointer", question.length === 0 && "hidden") }, "Clear")),
        React.createElement("div", { className: "h-[calc(100%-95px)] lg:max-h-[calc(100%-140px)] lg:min-h-[calc(100%-140px)] overflow-auto" },
            React.createElement("div", { ref: contentRef },
                !conversation.length && (React.createElement(AiAssistantSuggestions, { className: "mx-docs_0.5" })),
                getThreadItems(),
                error?.length && (React.createElement(AiAssistantThreadItem, { item: {
                        type: "error",
                        content: error,
                    } })))),
        React.createElement("div", { className: clsx("py-docs_0.75 hidden md:flex items-center justify-end px-docs_1", "border-medusa-border-base border-t", "bg-medusa-bg-field-component") },
            React.createElement("div", { className: "flex items-center gap-docs_0.75" },
                React.createElement("div", { className: "flex items-center gap-docs_0.5" },
                    conversation.length === 0 && (React.createElement(React.Fragment, null,
                        React.createElement("span", { className: clsx("text-medusa-fg-subtle", "text-compact-x-small") }, "Navigate FAQ"),
                        React.createElement("span", { className: "gap-[5px] flex" },
                            React.createElement(Kbd, { className: clsx("!bg-medusa-bg-field-component !border-medusa-border-strong", "!text-medusa-fg-subtle h-[18px] w-[18px] p-0") }, "\u2191"),
                            React.createElement(Kbd, { className: clsx("!bg-medusa-bg-field-component !border-medusa-border-strong", "!text-medusa-fg-subtle h-[18px] w-[18px] p-0") }, "\u2193")))),
                    conversation.length > 0 && (React.createElement("span", { className: clsx("text-medusa-fg-muted", "text-compact-x-small") }, "Chat is cleared on exit"))),
                React.createElement("div", { className: clsx("h-docs_0.75 w-px bg-medusa-border-strong") }),
                React.createElement("div", { className: "flex items-center gap-docs_0.5" },
                    React.createElement("span", { className: clsx("text-medusa-fg-subtle", "text-compact-x-small") }, "Ask Question"),
                    React.createElement(Kbd, { className: clsx("!bg-medusa-bg-field-component !border-medusa-border-strong", "!text-medusa-fg-subtle h-[18px] w-[18px] p-0") }, "\u21B5"))))));
};
