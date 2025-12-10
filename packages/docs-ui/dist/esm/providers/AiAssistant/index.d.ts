import React from "react";
import type { Source } from "@kapaai/react-sdk";
export type AiAssistantChatType = "default" | "popover";
export type AiAssistantContextType = {
    chatOpened: boolean;
    setChatOpened: React.Dispatch<React.SetStateAction<boolean>>;
    chatType: AiAssistantChatType;
    inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    loading: boolean;
    isCaptchaLoaded: boolean;
};
export type AiAssistantThreadItem = {
    type: "question" | "answer" | "error";
    content: string;
    question_id?: string | null;
    sources?: Source[];
};
export type AiAssistantProviderProps = {
    children?: React.ReactNode;
    integrationId: string;
    chatType?: AiAssistantChatType;
    type?: "search" | "chat";
};
export declare const AiAssistantProvider: ({ integrationId, ...props }: AiAssistantProviderProps) => React.JSX.Element;
export declare const useAiAssistant: () => AiAssistantContextType;
//# sourceMappingURL=index.d.ts.map