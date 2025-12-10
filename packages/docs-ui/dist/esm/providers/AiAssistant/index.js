"use client";
import { KapaProvider, useChat } from "@kapaai/react-sdk";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import { AiAssistantSearchWindow } from "../../components";
import { useIsBrowser } from "../BrowserProvider";
const AiAssistantContext = createContext(null);
const AiAssistantInnerProvider = ({ children, chatType = "default", preventAutoScroll, setPreventAutoScroll, setOnCompleteAction, type, }) => {
    const [isCaptchaLoaded, setIsCaptchaLoaded] = useState(false);
    const [chatOpened, setChatOpened] = useState(false);
    const inputRef = useRef(null);
    const contentRef = useRef(null);
    const { isGeneratingAnswer, isPreparingAnswer } = useChat();
    const loading = useMemo(() => isGeneratingAnswer || isPreparingAnswer, [isGeneratingAnswer, isPreparingAnswer]);
    const { isBrowser } = useIsBrowser();
    const scrollToBottom = () => {
        if (preventAutoScroll) {
            return;
        }
        const parent = contentRef.current?.parentElement;
        parent.scrollTop = parent.scrollHeight;
    };
    useResizeObserver(contentRef, () => {
        if (!loading) {
            return;
        }
        scrollToBottom();
    });
    const handleUserScroll = useCallback(() => {
        if (!loading || preventAutoScroll) {
            return;
        }
        setPreventAutoScroll(true);
    }, [loading, preventAutoScroll]);
    useEffect(() => {
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
    useEffect(() => {
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
    useEffect(() => {
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
    return (React.createElement(AiAssistantContext.Provider, { value: {
            chatOpened,
            setChatOpened,
            chatType,
            inputRef,
            contentRef,
            loading,
            isCaptchaLoaded,
        } },
        children,
        type === "search" && React.createElement(AiAssistantSearchWindow, null)));
};
export const AiAssistantProvider = ({ integrationId, ...props }) => {
    const [preventAutoScroll, setPreventAutoScroll] = useState(false);
    const [onCompleteAction, setOnCompleteAction] = useState(() => () => { });
    return (React.createElement(KapaProvider, { integrationId: integrationId, callbacks: {
            askAI: {
                onAnswerGenerationCompleted: () => {
                    onCompleteAction?.();
                },
                onQuerySubmit: () => setPreventAutoScroll(false),
            },
        }, userTrackingMode: "cookie" },
        React.createElement(AiAssistantInnerProvider, { ...props, preventAutoScroll: preventAutoScroll, setPreventAutoScroll: setPreventAutoScroll, setOnCompleteAction: setOnCompleteAction })));
};
export const useAiAssistant = () => {
    const context = useContext(AiAssistantContext);
    if (!context) {
        throw new Error("useAiAssistant must be used within a AiAssistantProvider");
    }
    return context;
};
