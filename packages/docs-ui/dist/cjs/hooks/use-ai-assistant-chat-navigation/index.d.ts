import { type useKeyboardShortcutOptions } from "../use-keyboard-shortcut";
export type UseAiAssistantChatNavigationProps = {
    getChatWindowElm: () => HTMLElement | null;
    getInputElm: () => HTMLTextAreaElement | null;
    focusInput: () => void;
    keyboardProps?: Partial<useKeyboardShortcutOptions>;
    question: string;
};
export declare const useAiAssistantChatNavigation: ({ getInputElm, focusInput, keyboardProps, getChatWindowElm, question, }: UseAiAssistantChatNavigationProps) => void;
//# sourceMappingURL=index.d.ts.map