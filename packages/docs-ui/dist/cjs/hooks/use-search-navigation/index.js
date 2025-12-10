"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSearchNavigation = void 0;
const react_1 = require("react");
const providers_1 = require("../../providers");
const utils_1 = require("../../utils");
const use_keyboard_shortcut_1 = require("../use-keyboard-shortcut");
const useSearchNavigation = ({ getInputElm, focusInput, handleSubmit, keyboardProps, }) => {
    const shortcutKeys = (0, react_1.useMemo)(() => ["ArrowUp", "ArrowDown", "Enter"], []);
    const { modalRef, isOpen } = (0, providers_1.useSearch)();
    const handleKeyAction = (e) => {
        if (!isOpen) {
            return;
        }
        e.preventDefault();
        const focusedItem = modalRef.current?.querySelector(":focus");
        if (!focusedItem) {
            // focus the first data-hit
            const nextItem = modalRef.current?.querySelector("[data-hit]");
            nextItem?.focus();
            return;
        }
        const isHit = focusedItem.hasAttribute("data-hit");
        const isInput = focusedItem.tagName.toLowerCase() === "input";
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
            else {
                handleSubmit?.();
            }
            return;
        }
        if (lowerPressedKey === "arrowup") {
            // only hit items has action on arrow up
            if (isHit) {
                // find if there's a data-hit item before this one
                const beforeItem = (0, utils_1.findPrevSibling)(focusedItem, "[data-hit]");
                if (!beforeItem) {
                    // check if there's a data-group before this one
                    const beforeGroup = focusedItem.parentElement
                        ? (0, utils_1.findPrevSibling)(focusedItem.parentElement, "[data-group]")
                            ?.lastElementChild
                        : null;
                    if (beforeGroup) {
                        // focus the last item in the previous group
                        beforeGroup.focus();
                    }
                    else {
                        // focus the input
                        focusInput();
                    }
                }
                else {
                    // focus the previous item
                    beforeItem.focus();
                }
            }
        }
        else if (lowerPressedKey === "arrowdown") {
            // check if item is input or hit
            if (isInput) {
                // go to the first data-hit item
                const nextItem = modalRef.current?.querySelector("[data-index]:not(.hidden) [data-hit]");
                nextItem?.focus();
            }
            else {
                // handle go down for hit items
                // find if there's a data-hit item after this one
                const afterItem = (0, utils_1.findNextSibling)(focusedItem, "[data-hit]");
                if (afterItem) {
                    // focus the next item
                    afterItem.focus();
                }
                else if (focusedItem.parentElement) {
                    // try to go to next hit in the next group
                    const nextGroupFirstItem = (0, utils_1.findNextSibling)(focusedItem.parentElement, "[data-group]")?.firstElementChild;
                    if (nextGroupFirstItem) {
                        nextGroupFirstItem.focus();
                    }
                }
            }
        }
    };
    /** Handles starting to type which focuses the input */
    const handleKeyDown = (0, react_1.useCallback)((e) => {
        if (!isOpen) {
            return;
        }
        // check if shortcut keys were pressed
        const lowerPressedKey = e.key.toLowerCase();
        const pressedShortcut = [...shortcutKeys, "Escape"].some((s) => s.toLowerCase() === lowerPressedKey);
        if (pressedShortcut) {
            return;
        }
        const focusedItem = modalRef.current?.querySelector(":focus");
        const inputElm = getInputElm();
        if (inputElm && focusedItem !== inputElm) {
            focusInput();
        }
    }, [
        shortcutKeys,
        isOpen,
        modalRef.current,
        shortcutKeys,
        getInputElm,
        focusInput,
    ]);
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
        action: handleKeyAction,
        ...keyboardProps,
    });
};
exports.useSearchNavigation = useSearchNavigation;
