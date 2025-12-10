"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
// @ts-expect-error can't install the types package because it doesn't support React v19
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Solutions } from "./Solutions";
import { useAnalytics } from "../../providers/Analytics";
import clsx from "clsx";
import { Button, TextArea, Label, DottedSeparator, RadioItem, } from "../../components";
import { ChatBubbleLeftRight, ThumbDown, ThumbUp } from "@medusajs/icons";
import Link from "next/link";
import { useSiteConfig } from "../../providers";
import { RadioGroup } from "@medusajs/ui";
const feedbackOptions = {
    positive: [
        "Easy to understand",
        "Accurate code and text",
        "Exactly what I was looking for",
        "Ease of use",
        "Other",
    ],
    negative: [
        "Difficult to understand",
        "Inaccurate code or text",
        "Didn't find what I was looking for",
        "Trouble using the documentation",
        "Other",
    ],
};
export const Feedback = ({ event, reportLink: initReportLink, question = "Was this page helpful?", positiveBtn = "It was helpful", negativeBtn = "It wasn't helpful", positiveQuestion = "What did you like?", negativeQuestion = "What was the problem?", submitBtn = "Submit", submitMessage = "Thank you for helping improve our documentation!", showPossibleSolutions = true, className = "", extraData = {}, vertical = false, showDottedSeparator = true, }) => {
    const { config: { reportIssueLink }, } = useSiteConfig();
    const reportLink = useMemo(() => {
        return initReportLink || reportIssueLink;
    }, [initReportLink, reportIssueLink]);
    const [showForm, setShowForm] = useState(false);
    const [submittedFeedback, setSubmittedFeedback] = useState(false);
    const [loading, setLoading] = useState(false);
    const inlineFeedbackRef = useRef(null);
    const inlineQuestionRef = useRef(null);
    const inlineMessageRef = useRef(null);
    const [positiveFeedback, setPositiveFeedback] = useState(false);
    const [message, setMessage] = useState("");
    const [feedbackOption, setFeedbackOption] = useState("");
    const nodeRef = submittedFeedback
        ? inlineMessageRef
        : showForm
            ? inlineQuestionRef
            : inlineFeedbackRef;
    const { track } = useAnalytics();
    function handleFeedback(feedback) {
        setPositiveFeedback(feedback);
        setShowForm(true);
        submitFeedback(feedback);
    }
    function submitFeedback(feedback = false) {
        if (showForm) {
            setLoading(true);
        }
        track({
            event: {
                event,
                options: {
                    feedback: (feedback !== null && feedback) ||
                        (feedback === null && positiveFeedback)
                        ? "yes"
                        : "no",
                    message: message?.length ? message : null,
                    feedbackOption,
                    ...extraData,
                },
                callback: function () {
                    if (showForm) {
                        setLoading(false);
                        resetForm();
                    }
                },
            },
        });
    }
    function resetForm() {
        setShowForm(false);
        setSubmittedFeedback(true);
    }
    useEffect(() => {
        setFeedbackOption("Other");
    }, [positiveFeedback]);
    return (React.createElement("div", { className: clsx(className) },
        showDottedSeparator && (React.createElement(DottedSeparator, { wrapperClassName: "!px-0 !my-docs_2" })),
        React.createElement(SwitchTransition, { mode: "out-in" },
            React.createElement(CSSTransition, { key: showForm
                    ? "show_form"
                    : !submittedFeedback
                        ? "feedback"
                        : "submitted_feedback", nodeRef: nodeRef, timeout: 300, addEndListener: (done) => {
                    nodeRef.current?.addEventListener("transitionend", done, false);
                }, classNames: {
                    enter: "animate-fadeIn animation-fill-forwards animate-fast",
                    exit: "animate-fadeOut animation-fill-forwards animate-fast",
                } },
                React.createElement(React.Fragment, null,
                    !showForm && !submittedFeedback && (React.createElement("div", { className: clsx("flex gap-docs_0.5", !vertical && "flex-col md:flex-row md:items-center", vertical && "flex-col justify-center"), ref: inlineFeedbackRef },
                        React.createElement(Label, { className: "text-compact-small text-medusa-fg-base" }, question),
                        React.createElement("div", { className: clsx("flex gap-docs_0.5", "flex-col md:flex-row md:items-center") },
                            React.createElement(Button, { onClick: () => handleFeedback(true), className: clsx("positive gap-[6px] !justify-start md:!justify-center", "!px-docs_0.5 !py-docs_0.25 text-left md:text-center"), variant: "transparent-clear" },
                                React.createElement(ThumbUp, { className: "text-medusa-fg-subtle" }),
                                React.createElement("span", { className: "text-medusa-fg-base text-compact-small-plus flex-1" }, positiveBtn)),
                            React.createElement(Button, { onClick: () => handleFeedback(false), className: clsx("gap-[6px] !justify-start md:!justify-center", "!px-docs_0.5 !py-docs_0.25 text-left md:text-center"), variant: "transparent-clear" },
                                React.createElement(ThumbDown, { className: "text-medusa-fg-subtle" }),
                                React.createElement("span", { className: "text-medusa-fg-base text-compact-small-plus flex-1" }, negativeBtn)),
                            reportLink && (React.createElement(Button, { variant: "transparent-clear", className: clsx("gap-[6px] relative", "!px-docs_0.5 !py-docs_0.25", "!justify-start md:!justify-center", "text-left md:text-center") },
                                React.createElement(ChatBubbleLeftRight, { className: "text-medusa-fg-subtle" }),
                                React.createElement("span", { className: "text-medusa-fg-base text-compact-small-plus flex-1" }, "Report Issue"),
                                React.createElement(Link, { href: reportLink, className: "absolute left-0 top-0 w-full h-full" })))))),
                    showForm && !submittedFeedback && (React.createElement("div", { className: "flex flex-col gap-docs_1", ref: inlineQuestionRef },
                        React.createElement(Label, null, positiveFeedback ? positiveQuestion : negativeQuestion),
                        React.createElement(RadioGroup, { className: "gap-docs_0.5" }, feedbackOptions[positiveFeedback ? "positive" : "negative"].map((option) => (React.createElement("div", { className: "flex items-center gap-x-docs_0.5 cursor-pointer group", key: option, tabIndex: -1, onClick: () => setFeedbackOption(option) },
                            React.createElement(RadioItem, { checked: feedbackOption === option, value: option, onChange: () => setFeedbackOption(option), className: clsx(feedbackOption !== option &&
                                    "group-hover:bg-medusa-bg-component-hover") }),
                            React.createElement(Label, { className: "text-medusa-fg-base text-compact-small-plus" }, option))))),
                        React.createElement(TextArea, { rows: 4, value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Please provide as many details as possible to help us improve the documentation." }),
                        React.createElement(Button, { onClick: () => submitFeedback(positiveFeedback), disabled: loading, className: "w-fit", variant: "secondary" }, submitBtn))),
                    submittedFeedback && (React.createElement("div", null,
                        React.createElement("div", { className: "text-compact-large-plus flex flex-col", ref: inlineMessageRef },
                            React.createElement("span", null, submitMessage),
                            showPossibleSolutions && (React.createElement(Solutions, { message: message, feedback: positiveFeedback })))))))),
        showDottedSeparator && (React.createElement(DottedSeparator, { wrapperClassName: "!px-0 !my-docs_2" }))));
};
