"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHeadingUrl = void 0;
const navigation_1 = require("next/navigation");
const providers_1 = require("../../providers");
const react_1 = require("react");
const useHeadingUrl = ({ id }) => {
    const { isBrowser } = (0, providers_1.useIsBrowser)();
    const { config: { basePath }, } = (0, providers_1.useSiteConfig)();
    const pathname = (0, navigation_1.usePathname)();
    const headingUrl = (0, react_1.useMemo)(() => {
        const hash = `#${id}`;
        if (!isBrowser) {
            return hash;
        }
        const url = `${window.location.origin}${basePath}${pathname}`.replace(/\/$/, "");
        return `${url}${hash}`;
    }, [id, isBrowser, pathname]);
    return headingUrl;
};
exports.useHeadingUrl = useHeadingUrl;
