"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClickOutside = void 0;
const react_1 = require("react");
const __1 = require("../..");
const useClickOutside = ({ elmRef, onClickOutside, }) => {
    const { isBrowser } = (0, __1.useIsBrowser)();
    const checkClickOutside = (0, react_1.useCallback)((e) => {
        const node = e.target;
        if (!elmRef.current?.contains(node) && node.isConnected) {
            onClickOutside(e);
        }
    }, [elmRef.current, onClickOutside]);
    (0, react_1.useEffect)(() => {
        if (!isBrowser) {
            return;
        }
        window.document.addEventListener("click", checkClickOutside);
        return () => {
            window.document.removeEventListener("click", checkClickOutside);
        };
    }, [isBrowser, checkClickOutside]);
};
exports.useClickOutside = useClickOutside;
