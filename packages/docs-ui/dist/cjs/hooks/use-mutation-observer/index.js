"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMutationObserver = void 0;
const react_1 = require("react");
const useMutationObserver = ({ elm, callback, options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
}, }) => {
    (0, react_1.useEffect)(() => {
        if (elm) {
            const observer = new MutationObserver(callback);
            observer.observe(elm, options);
            return () => observer.disconnect();
        }
    }, [callback, options]);
};
exports.useMutationObserver = useMutationObserver;
