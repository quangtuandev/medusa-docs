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
exports.Feedback = void 0;
const react_1 = __importStar(require("react"));
// @ts-expect-error can't install the types package because it doesn't support React v19
const react_transition_group_1 = require("react-transition-group");
const Solutions_1 = require("./Solutions");
const Analytics_1 = require("../../providers/Analytics");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../components");
const icons_1 = require("@medusajs/icons");
const link_1 = __importDefault(require("next/link"));
const providers_1 = require("../../providers");
const ui_1 = require("@medusajs/ui");
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
const Feedback = ({ event, reportLink: initReportLink, question = "Was this page helpful?", positiveBtn = "It was helpful", negativeBtn = "It wasn't helpful", positiveQuestion = "What did you like?", negativeQuestion = "What was the problem?", submitBtn = "Submit", submitMessage = "Thank you for helping improve our documentation!", showPossibleSolutions = true, className = "", extraData = {}, vertical = false, showDottedSeparator = true, }) => {
    const { config: { reportIssueLink }, } = (0, providers_1.useSiteConfig)();
    const reportLink = (0, react_1.useMemo)(() => {
        return initReportLink || reportIssueLink;
    }, [initReportLink, reportIssueLink]);
    const [showForm, setShowForm] = (0, react_1.useState)(false);
    const [submittedFeedback, setSubmittedFeedback] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const inlineFeedbackRef = (0, react_1.useRef)(null);
    const inlineQuestionRef = (0, react_1.useRef)(null);
    const inlineMessageRef = (0, react_1.useRef)(null);
    const [positiveFeedback, setPositiveFeedback] = (0, react_1.useState)(false);
    const [message, setMessage] = (0, react_1.useState)("");
    const [feedbackOption, setFeedbackOption] = (0, react_1.useState)("");
    const nodeRef = submittedFeedback
        ? inlineMessageRef
        : showForm
            ? inlineQuestionRef
            : inlineFeedbackRef;
    const { track } = (0, Analytics_1.useAnalytics)();
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
    (0, react_1.useEffect)(() => {
        setFeedbackOption("Other");
    }, [positiveFeedback]);
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(className) },
        showDottedSeparator && (react_1.default.createElement(components_1.DottedSeparator, { wrapperClassName: "!px-0 !my-docs_2" })),
        react_1.default.createElement(react_transition_group_1.SwitchTransition, { mode: "out-in" },
            react_1.default.createElement(react_transition_group_1.CSSTransition, { key: showForm
                    ? "show_form"
                    : !submittedFeedback
                        ? "feedback"
                        : "submitted_feedback", nodeRef: nodeRef, timeout: 300, addEndListener: (done) => {
                    nodeRef.current?.addEventListener("transitionend", done, false);
                }, classNames: {
                    enter: "animate-fadeIn animation-fill-forwards animate-fast",
                    exit: "animate-fadeOut animation-fill-forwards animate-fast",
                } },
                react_1.default.createElement(react_1.default.Fragment, null,
                    !showForm && !submittedFeedback && (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex gap-docs_0.5", !vertical && "flex-col md:flex-row md:items-center", vertical && "flex-col justify-center"), ref: inlineFeedbackRef },
                        react_1.default.createElement(components_1.Label, { className: "text-compact-small text-medusa-fg-base" }, question),
                        react_1.default.createElement("div", { className: (0, clsx_1.default)("flex gap-docs_0.5", "flex-col md:flex-row md:items-center") },
                            react_1.default.createElement(components_1.Button, { onClick: () => handleFeedback(true), className: (0, clsx_1.default)("positive gap-[6px] !justify-start md:!justify-center", "!px-docs_0.5 !py-docs_0.25 text-left md:text-center"), variant: "transparent-clear" },
                                react_1.default.createElement(icons_1.ThumbUp, { className: "text-medusa-fg-subtle" }),
                                react_1.default.createElement("span", { className: "text-medusa-fg-base text-compact-small-plus flex-1" }, positiveBtn)),
                            react_1.default.createElement(components_1.Button, { onClick: () => handleFeedback(false), className: (0, clsx_1.default)("gap-[6px] !justify-start md:!justify-center", "!px-docs_0.5 !py-docs_0.25 text-left md:text-center"), variant: "transparent-clear" },
                                react_1.default.createElement(icons_1.ThumbDown, { className: "text-medusa-fg-subtle" }),
                                react_1.default.createElement("span", { className: "text-medusa-fg-base text-compact-small-plus flex-1" }, negativeBtn)),
                            reportLink && (react_1.default.createElement(components_1.Button, { variant: "transparent-clear", className: (0, clsx_1.default)("gap-[6px] relative", "!px-docs_0.5 !py-docs_0.25", "!justify-start md:!justify-center", "text-left md:text-center") },
                                react_1.default.createElement(icons_1.ChatBubbleLeftRight, { className: "text-medusa-fg-subtle" }),
                                react_1.default.createElement("span", { className: "text-medusa-fg-base text-compact-small-plus flex-1" }, "Report Issue"),
                                react_1.default.createElement(link_1.default, { href: reportLink, className: "absolute left-0 top-0 w-full h-full" })))))),
                    showForm && !submittedFeedback && (react_1.default.createElement("div", { className: "flex flex-col gap-docs_1", ref: inlineQuestionRef },
                        react_1.default.createElement(components_1.Label, null, positiveFeedback ? positiveQuestion : negativeQuestion),
                        react_1.default.createElement(ui_1.RadioGroup, { className: "gap-docs_0.5" }, feedbackOptions[positiveFeedback ? "positive" : "negative"].map((option) => (react_1.default.createElement("div", { className: "flex items-center gap-x-docs_0.5 cursor-pointer group", key: option, tabIndex: -1, onClick: () => setFeedbackOption(option) },
                            react_1.default.createElement(components_1.RadioItem, { checked: feedbackOption === option, value: option, onChange: () => setFeedbackOption(option), className: (0, clsx_1.default)(feedbackOption !== option &&
                                    "group-hover:bg-medusa-bg-component-hover") }),
                            react_1.default.createElement(components_1.Label, { className: "text-medusa-fg-base text-compact-small-plus" }, option))))),
                        react_1.default.createElement(components_1.TextArea, { rows: 4, value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Please provide as many details as possible to help us improve the documentation." }),
                        react_1.default.createElement(components_1.Button, { onClick: () => submitFeedback(positiveFeedback), disabled: loading, className: "w-fit", variant: "secondary" }, submitBtn))),
                    submittedFeedback && (react_1.default.createElement("div", null,
                        react_1.default.createElement("div", { className: "text-compact-large-plus flex flex-col", ref: inlineMessageRef },
                            react_1.default.createElement("span", null, submitMessage),
                            showPossibleSolutions && (react_1.default.createElement(Solutions_1.Solutions, { message: message, feedback: positiveFeedback })))))))),
        showDottedSeparator && (react_1.default.createElement(components_1.DottedSeparator, { wrapperClassName: "!px-0 !my-docs_2" }))));
};
exports.Feedback = Feedback;
