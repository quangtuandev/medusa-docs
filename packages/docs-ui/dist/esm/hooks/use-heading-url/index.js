"use client";
import { usePathname } from "next/navigation";
import { useIsBrowser, useSiteConfig } from "../../providers";
import { useMemo } from "react";
export const useHeadingUrl = ({ id }) => {
    const { isBrowser } = useIsBrowser();
    const { config: { basePath }, } = useSiteConfig();
    const pathname = usePathname();
    const headingUrl = useMemo(() => {
        const hash = `#${id}`;
        if (!isBrowser) {
            return hash;
        }
        const url = `${window.location.origin}${basePath}${pathname}`.replace(/\/$/, "");
        return `${url}${hash}`;
    }, [id, isBrowser, pathname]);
    return headingUrl;
};
