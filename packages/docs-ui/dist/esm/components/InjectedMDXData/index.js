"use client";
import React, { useEffect } from "react";
import { useSiteConfig } from "../../providers";
/**
 * This component is injected by a recma plugin into MDX documents.
 */
export const InjectedMDXData = ({ frontmatter, toc }) => {
    const { setFrontmatter, setToc } = useSiteConfig();
    useEffect(() => {
        setFrontmatter(frontmatter);
    }, [frontmatter]);
    useEffect(() => {
        setToc(toc);
    }, [toc]);
    return React.createElement(React.Fragment, null);
};
