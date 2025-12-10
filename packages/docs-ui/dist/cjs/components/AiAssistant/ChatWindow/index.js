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
exports.AiAssistantChatWindow = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const providers_1 = require("../../../providers");
const Header_1 = require("./Header");
const Suggestions_1 = require("../Suggestions");
const ThreadItem_1 = require("../ThreadItem");
const Input_1 = require("./Input");
const __1 = require("../../..");
const Footer_1 = require("./Footer");
const react_sdk_1 = require("@kapaai/react-sdk");
const DEFAULT_HEIGHT = "calc(100% - 8px)";
const AiAssistantChatWindow = () => {
    const { chatOpened, setChatOpened, chatType: type, inputRef, contentRef, loading, } = (0, providers_1.useAiAssistant)();
    const { conversation, error } = (0, react_sdk_1.useChat)();
    const [height, setHeight] = (0, react_1.useState)(DEFAULT_HEIGHT);
    const [showFade, setShowFade] = (0, react_1.useState)(false);
    const { isBrowser } = (0, providers_1.useIsBrowser)();
    const chatWindowRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (chatOpened) {
            inputRef.current?.focus({
                preventScroll: true,
            });
        }
        else {
            inputRef.current?.blur();
        }
    }, [chatOpened]);
    const getThreadItems = (0, react_1.useCallback)(() => {
        return conversation.map((item, index) => (react_1.default.createElement(react_1.Fragment, { key: index },
            react_1.default.createElement(ThreadItem_1.AiAssistantThreadItem, { item: {
                    type: "question",
                    content: item.question,
                    sources: item.sources,
                    question_id: item.id,
                } }),
            react_1.default.createElement(ThreadItem_1.AiAssistantThreadItem, { item: {
                    type: "answer",
                    content: item.answer,
                    sources: item.sources,
                    question_id: item.id,
                } }))));
    }, [conversation]);
    (0, __1.useKeyboardShortcut)({
        metakey: false,
        shortcutKeys: ["escape"],
        checkEditing: false,
        action: () => {
            if (!chatWindowRef.current?.contains(document.activeElement)) {
                return;
            }
            setChatOpened(false);
        },
    });
    const checkShowFade = () => {
        const parentElm = contentRef.current?.parentElement;
        if (!parentElm) {
            return;
        }
        setShowFade(!loading &&
            parentElm.offsetHeight + parentElm.scrollTop <
                parentElm.scrollHeight - 1);
    };
    (0, react_1.useEffect)(() => {
        if (!contentRef.current?.parentElement) {
            return;
        }
        contentRef.current.parentElement.addEventListener("scroll", checkShowFade);
        return () => {
            contentRef.current?.parentElement?.removeEventListener("scroll", checkShowFade);
        };
    }, [contentRef.current]);
    (0, react_1.useEffect)(() => {
        if (loading) {
            setShowFade(false);
        }
        else {
            checkShowFade();
        }
    }, [loading]);
    const changeHeightForViewport = () => {
        if (!window.visualViewport?.height) {
            setHeight(DEFAULT_HEIGHT);
            return;
        }
        setHeight(`${window.visualViewport.height - 8}px`);
    };
    (0, react_1.useEffect)(() => {
        if (!isBrowser) {
            return;
        }
        window.visualViewport?.addEventListener("resize", changeHeightForViewport);
        return () => {
            window.visualViewport?.removeEventListener("resize", changeHeightForViewport);
        };
    }, [isBrowser]);
    (0, react_1.useEffect)(() => {
        checkShowFade();
    }, [height]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, clsx_1.default)("fixed top-0 left-0 h-screen w-screen z-50 bg-medusa-bg-overlay", !chatOpened && "hidden", chatOpened && "block", type === "default" && "xxl:hidden"), onClick: () => setChatOpened(false) }),
        react_1.default.createElement("div", { className: (0, clsx_1.default)("flex z-50 w-[calc(100%-8px)] md:w-ai-assistant transition-[right]", "absolute -right-[150%] sm:-right-full top-0", type === "default" && [
                "xxl:w-0 xxl:relative xxl:transition-[right,width]",
                "xxl:shadow-elevation-card-rest xxl:dark:shadow-elevation-card-rest-dark",
                chatOpened && "xxl:!w-ai-assistant",
            ], "shadow-elevation-modal dark:shadow-elevation-modal-dark", "bg-medusa-bg-base rounded-docs_DEFAULT overflow-x-hidden", "flex-col justify-between m-docs_0.25 max-w-ai-assistant", chatOpened && ["!right-0"], !chatOpened && ["!fixed"]), style: {
                height,
            }, ref: chatWindowRef },
            react_1.default.createElement(Header_1.AiAssistantChatWindowHeader, null),
            react_1.default.createElement("div", { className: "flex flex-auto overflow-auto relative" },
                react_1.default.createElement("div", { className: (0, clsx_1.default)("overflow-y-auto flex-auto px-docs_0.5 pt-docs_0.25 pb-docs_2") },
                    react_1.default.createElement("div", { ref: contentRef },
                        !conversation.length && react_1.default.createElement(Suggestions_1.AiAssistantSuggestions, null),
                        getThreadItems(),
                        error?.length && (react_1.default.createElement(ThreadItem_1.AiAssistantThreadItem, { item: {
                                type: "error",
                                content: error,
                            } })))),
                react_1.default.createElement("span", { className: (0, clsx_1.default)("bg-ai-assistant-bottom content-[''] absolute pointer-events-none", "bottom-0 left-0 w-full h-docs_6 z-10 opacity-0 transition-opacity", showFade && "opacity-100") })),
            react_1.default.createElement(Input_1.AiAssistantChatWindowInput, { chatWindowRef: chatWindowRef }),
            react_1.default.createElement(Footer_1.AiAssistantChatWindowFooter, null))));
};
exports.AiAssistantChatWindow = AiAssistantChatWindow;
