"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAiAssistantChatNavigation = void 0;
const react_1 = require("react");
const providers_1 = require("../../providers");
const utils_1 = require("../../utils");
const use_keyboard_shortcut_1 = require("../use-keyboard-shortcut");
const useAiAssistantChatNavigation = ({ getInputElm, focusInput, keyboardProps, getChatWindowElm, question, }) => {
    const shortcutKeys = (0, react_1.useMemo)(() => ["ArrowUp", "ArrowDown", "Enter"], []);
    const { chatOpened } = (0, providers_1.useAiAssistant)();
    const handleKeyAction = (e) => {
        const chatElm = getChatWindowElm();
        if (!chatOpened ||
            e.metaKey ||
            e.ctrlKey ||
            !chatElm?.contains(document.activeElement) ||
            (question.length && question.includes("\n"))) {
            return;
        }
        e.preventDefault();
        const focusedItem = chatElm?.querySelector(":focus");
        if (!focusedItem) {
            // focus the first data-hit
            const nextItem = chatElm?.querySelector("[data-hit]");
            nextItem?.focus();
            return;
        }
        const isHit = focusedItem.hasAttribute("data-hit");
        const isInput = focusedItem.tagName.toLowerCase() === "textarea";
        if (!isHit && !isInput) {
            // ignore if focused items aren't input/data-hit
            return;
        }
        const lowerPressedKey = e.key.toLowerCase();
        if (lowerPressedKey === "enter") {
            if (isHit) {
                // trigger click event of the focused element
                focusedItem.click();
            }
            return;
        }
        if (lowerPressedKey === "arrowdown") {
            // only hit items has action on arrow down
            if (isHit) {
                // find if there's a data-hit item before this one
                const beforeItem = (0, utils_1.findNextSibling)(focusedItem, "[data-hit]");
                if (!beforeItem) {
                    // focus the input
                    focusInput();
                }
                else {
                    // focus the previous item
                    beforeItem.focus();
                }
            }
        }
        else if (lowerPressedKey === "arrowup") {
            // check if item is input or hit
            if (isInput) {
                // go to the first data-hit item
                const nextItem = chatElm?.querySelector("[data-hit]:last-child");
                nextItem?.focus();
            }
            else {
                // handle go down for hit items
                // find if there's a data-hit item after this one
                const afterItem = (0, utils_1.findPrevSibling)(focusedItem, "[data-hit]");
                if (afterItem) {
                    // focus the next item
                    afterItem.focus();
                }
            }
        }
    };
    /** Handles starting to type which focuses the input */
    const handleKeyDown = (0, react_1.useCallback)((e) => {
        if (!chatOpened) {
            return;
        }
        // check if shortcut keys were pressed
        const lowerPressedKey = e.key.toLowerCase();
        const pressedShortcut = [...shortcutKeys, "Escape"].some((s) => s.toLowerCase() === lowerPressedKey);
        if (pressedShortcut) {
            return;
        }
        const chatElm = getChatWindowElm();
        if (!chatElm?.contains(document.activeElement)) {
            return;
        }
        const focusedItem = chatElm?.querySelector(":focus");
        const inputElm = getInputElm();
        if (inputElm && focusedItem !== inputElm) {
            focusInput();
        }
    }, [shortcutKeys, chatOpened, shortcutKeys, getInputElm, focusInput]);
    (0, react_1.useEffect)(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);
    (0, use_keyboard_shortcut_1.useKeyboardShortcut)({
        metakey: false,
        shortcutKeys: shortcutKeys,
        checkEditing: false,
        isLoading: false,
        preventDefault: false,
        action: handleKeyAction,
        ...keyboardProps,
    });
};
exports.useAiAssistantChatNavigation = useAiAssistantChatNavigation;
