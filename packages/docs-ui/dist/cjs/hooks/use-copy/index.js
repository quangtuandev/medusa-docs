"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCopy = void 0;
const react_1 = require("react");
const useCopy = (text) => {
    const [isCopied, setIsCopied] = (0, react_1.useState)(false);
    const copyTimeout = (0, react_1.useRef)(0);
    const handleCopy = (0, react_1.useCallback)(() => {
        navigator.clipboard
            .writeText(text.trim())
            .then(() => {
            setIsCopied(true);
            copyTimeout.current = window.setTimeout(() => {
                setIsCopied(false);
            }, 1000);
        })
            .catch(console.error);
    }, [text]);
    (0, react_1.useEffect)(() => () => window.clearTimeout(copyTimeout.current), []);
    return { isCopied, handleCopy };
};
exports.useCopy = useCopy;
