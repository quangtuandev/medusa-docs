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
exports.AiAssistantChatWindowInput = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const providers_1 = require("../../../../providers");
const react_sdk_1 = require("@kapaai/react-sdk");
const hooks_1 = require("../../../../hooks");
const Tooltip_1 = require("../../../Tooltip");
const constants_1 = require("../../../../constants");
const AiAssistantChatWindowInput = ({ chatWindowRef, }) => {
    const { chatOpened, inputRef, loading, setChatOpened, isCaptchaLoaded } = (0, providers_1.useAiAssistant)();
    const { submitQuery, conversation } = (0, react_sdk_1.useChat)();
    const { track } = (0, providers_1.useAnalytics)();
    const { active, toggle } = (0, react_sdk_1.useDeepThinking)();
    const { isBrowser } = (0, providers_1.useIsBrowser)();
    const { searchQuery, searchQueryType } = (0, react_1.useMemo)(() => {
        if (!isBrowser) {
            return {};
        }
        const searchParams = new URLSearchParams(location.search);
        return {
            searchQuery: searchParams.get("query"),
            searchQueryType: searchParams.get("queryType"),
        };
    }, [isBrowser]);
    const [question, setQuestion] = react_1.default.useState("");
    const formRef = (0, react_1.useRef)(null);
    const onSubmit = (e, overrideQuestion) => {
        e?.preventDefault();
        submitQuery(overrideQuestion || question);
        if (!conversation.length) {
            track({
                event: {
                    event: constants_1.DocsTrackingEvents.AI_ASSISTANT_START_CHAT,
                },
            });
        }
        setQuestion("");
    };
    const handleKeyboardDown = (e) => {
        if (e.key === "ArrowUp" && !question) {
            const lastQuestion = conversation.getLatest()?.question;
            if (lastQuestion) {
                setQuestion(lastQuestion);
            }
            return;
        }
        if (e.key !== "Enter") {
            return;
        }
        if (e.shiftKey) {
            const { selectionStart, selectionEnd } = e.currentTarget;
            setQuestion((prev) => `${prev.substring(0, selectionStart)}\n${prev.substring(selectionEnd)}`);
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.selectionStart = inputRef.current.selectionEnd =
                        selectionStart + 1;
                }
            }, 0);
        }
        else {
            onSubmit();
        }
    };
    const adjustTextareaHeight = () => {
        if (!inputRef.current) {
            return;
        }
        if (!question.length) {
            inputRef.current.style.height = "auto";
            return;
        }
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    };
    (0, react_1.useEffect)(() => {
        adjustTextareaHeight();
        if (chatOpened) {
            inputRef.current?.focus();
        }
    }, [question]);
    const handleTouch = (e) => {
        e.preventDefault();
        inputRef.current?.focus({
            preventScroll: true,
        });
    };
    (0, react_1.useEffect)(() => {
        if (!chatOpened || !inputRef.current) {
            return;
        }
        const isCursorAtEnd = inputRef.current.selectionStart === inputRef.current.value.length;
        if (isCursorAtEnd) {
            inputRef.current.scrollTop = inputRef.current.scrollHeight;
        }
    }, [chatOpened, inputRef.current]);
    (0, hooks_1.useAiAssistantChatNavigation)({
        getChatWindowElm: () => chatWindowRef.current,
        getInputElm: () => inputRef.current,
        focusInput: () => inputRef.current?.focus({
            preventScroll: true,
        }),
        question,
    });
    (0, react_1.useEffect)(() => {
        if (!searchQuery || !isCaptchaLoaded) {
            return;
        }
        setQuestion(searchQuery);
        setChatOpened(true);
        if (searchQueryType !== "submit") {
            return;
        }
        onSubmit(undefined, searchQuery);
    }, [searchQuery, searchQueryType, isCaptchaLoaded]);
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("px-docs_1 py-docs_0.75 border-t border-medusa-border-base") },
        react_1.default.createElement("form", { className: "flex flex-col gap-docs_0.5", onSubmit: onSubmit, ref: formRef },
            react_1.default.createElement("textarea", { className: (0, clsx_1.default)("appearance-none text-base md:text-small placeholder:text-medusa-fg-muted", "text-medusa-fg-base max-h-[210px] overflow-auto resize-none bg-transparent", "focus:outline-none focus:ring-0 disabled:cursor-not-allowed max-h-[210px]", "disabled:!bg-transparent disabled:text-medusa-fg-disabled disabled:placeholder:text-medusa-fg-disabled"), value: question, onChange: (e) => setQuestion(e.target.value), onKeyDown: handleKeyboardDown, onTouchStart: handleTouch, onTouchMove: handleTouch, onTouchEnd: handleTouch, ref: inputRef, placeholder: "Ask me a question about Medusa...", disabled: loading }),
            react_1.default.createElement("div", { className: "flex items-center justify-end gap-docs_1" },
                react_1.default.createElement(Tooltip_1.Tooltip, { tooltipChildren: react_1.default.createElement("span", null,
                        "Get better answers for complex questions.",
                        react_1.default.createElement("br", null),
                        "Results may take up to 1 minute.") },
                    react_1.default.createElement("button", { onClick: toggle, disabled: loading, className: (0, clsx_1.default)("txt-compact-xsmall-plus appearance-none transition-colors flex items-center gap-docs_0.25 px-docs_0.5 py-docs_0.25 rounded-docs_sm", !active &&
                            "bg-transparent hover:bg-medusa-button-transparent-hover text-medusa-fg-muted hover:text-medusa-fg-subtle", active &&
                            "bg-medusa-tag-orange-bg hover:bg-medusa-tag-orange-bg-hover text-medusa-tag-orange-text", loading && "cursor-not-allowed opacity-50"), type: "button" },
                        !active && react_1.default.createElement(icons_1.LightBulb, null),
                        active && (react_1.default.createElement(icons_1.LightBulbSolid, { className: "text-medusa-tag-orange-icon" })),
                        "Deep Thinking")),
                react_1.default.createElement("button", { className: (0, clsx_1.default)("appearance-none p-0 text-medusa-fg-base disabled:text-medusa-fg-disabled", "transition-colors"), disabled: !question || loading || !isCaptchaLoaded, type: "submit" },
                    react_1.default.createElement(icons_1.ArrowUpCircleSolid, null))))));
};
exports.AiAssistantChatWindowInput = AiAssistantChatWindowInput;
