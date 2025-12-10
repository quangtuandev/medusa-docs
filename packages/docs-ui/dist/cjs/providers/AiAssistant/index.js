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
exports.useAiAssistant = exports.AiAssistantProvider = void 0;
const react_sdk_1 = require("@kapaai/react-sdk");
const react_1 = __importStar(require("react"));
const resize_observer_1 = __importDefault(require("@react-hook/resize-observer"));
const components_1 = require("../../components");
const BrowserProvider_1 = require("../BrowserProvider");
const AiAssistantContext = (0, react_1.createContext)(null);
const AiAssistantInnerProvider = ({ children, chatType = "default", preventAutoScroll, setPreventAutoScroll, setOnCompleteAction, type, }) => {
    const [isCaptchaLoaded, setIsCaptchaLoaded] = (0, react_1.useState)(false);
    const [chatOpened, setChatOpened] = (0, react_1.useState)(false);
    const inputRef = (0, react_1.useRef)(null);
    const contentRef = (0, react_1.useRef)(null);
    const { isGeneratingAnswer, isPreparingAnswer } = (0, react_sdk_1.useChat)();
    const loading = (0, react_1.useMemo)(() => isGeneratingAnswer || isPreparingAnswer, [isGeneratingAnswer, isPreparingAnswer]);
    const { isBrowser } = (0, BrowserProvider_1.useIsBrowser)();
    const scrollToBottom = () => {
        if (preventAutoScroll) {
            return;
        }
        const parent = contentRef.current?.parentElement;
        parent.scrollTop = parent.scrollHeight;
    };
    (0, resize_observer_1.default)(contentRef, () => {
        if (!loading) {
            return;
        }
        scrollToBottom();
    });
    const handleUserScroll = (0, react_1.useCallback)(() => {
        if (!loading || preventAutoScroll) {
            return;
        }
        setPreventAutoScroll(true);
    }, [loading, preventAutoScroll]);
    (0, react_1.useEffect)(() => {
        if (!contentRef.current?.parentElement) {
            return;
        }
        contentRef.current.parentElement.addEventListener("wheel", handleUserScroll, {
            passive: true,
        });
        contentRef.current.parentElement.addEventListener("touchmove", handleUserScroll, {
            passive: true,
        });
        return () => {
            contentRef.current?.parentElement?.removeEventListener("wheel", handleUserScroll);
            contentRef.current?.parentElement?.removeEventListener("touchmove", handleUserScroll);
        };
    }, [contentRef.current, handleUserScroll]);
    (0, react_1.useEffect)(() => {
        setOnCompleteAction(() => {
            scrollToBottom();
            if (chatOpened) {
                inputRef.current?.focus({
                    preventScroll: true,
                });
            }
        });
    }, [scrollToBottom]);
    /**
     * This effect is required to avoid recaptcha messing up
     * the page layout.
     */
    (0, react_1.useEffect)(() => {
        if (!isBrowser) {
            return;
        }
        const recaptchaElm = document.querySelector(".grecaptcha-badge");
        recaptchaElm?.parentElement?.classList.add("absolute");
        const maxRetry = 10;
        let retries = 0;
        const interval = setInterval(() => {
            if (window.grecaptcha) {
                setIsCaptchaLoaded(true);
                clearInterval(interval);
                return;
            }
            retries++;
            if (retries > maxRetry) {
                clearInterval(interval);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [isBrowser]);
    return (react_1.default.createElement(AiAssistantContext.Provider, { value: {
            chatOpened,
            setChatOpened,
            chatType,
            inputRef,
            contentRef,
            loading,
            isCaptchaLoaded,
        } },
        children,
        type === "search" && react_1.default.createElement(components_1.AiAssistantSearchWindow, null)));
};
const AiAssistantProvider = ({ integrationId, ...props }) => {
    const [preventAutoScroll, setPreventAutoScroll] = (0, react_1.useState)(false);
    const [onCompleteAction, setOnCompleteAction] = (0, react_1.useState)(() => () => { });
    return (react_1.default.createElement(react_sdk_1.KapaProvider, { integrationId: integrationId, callbacks: {
            askAI: {
                onAnswerGenerationCompleted: () => {
                    onCompleteAction?.();
                },
                onQuerySubmit: () => setPreventAutoScroll(false),
            },
        }, userTrackingMode: "cookie" },
        react_1.default.createElement(AiAssistantInnerProvider, { ...props, preventAutoScroll: preventAutoScroll, setPreventAutoScroll: setPreventAutoScroll, setOnCompleteAction: setOnCompleteAction })));
};
exports.AiAssistantProvider = AiAssistantProvider;
const useAiAssistant = () => {
    const context = (0, react_1.useContext)(AiAssistantContext);
    if (!context) {
        throw new Error("useAiAssistant must be used within a AiAssistantProvider");
    }
    return context;
};
exports.useAiAssistant = useAiAssistant;
