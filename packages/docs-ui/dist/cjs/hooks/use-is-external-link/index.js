"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsExternalLink = void 0;
const react_1 = require("react");
const useIsExternalLink = ({ href }) => {
    const isExternal = (0, react_1.useMemo)(() => {
        return (href &&
            !href.startsWith("/") &&
            !href.startsWith("https://docs.medusajs.com") &&
            !href.startsWith("http://localhost:") &&
            !href.startsWith("#"));
    }, [href]);
    return isExternal;
};
exports.useIsExternalLink = useIsExternalLink;
