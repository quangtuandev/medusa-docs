import { useMemo } from "react";
export const useIsExternalLink = ({ href }) => {
    const isExternal = useMemo(() => {
        return (href &&
            !href.startsWith("/") &&
            !href.startsWith("https://docs.medusajs.com") &&
            !href.startsWith("http://localhost:") &&
            !href.startsWith("#"));
    }, [href]);
    return isExternal;
};
