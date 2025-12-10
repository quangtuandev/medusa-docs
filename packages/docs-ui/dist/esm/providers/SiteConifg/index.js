"use client";
import React, { createContext, useContext, useState } from "react";
import { globalConfig } from "../../global-config";
import { GITHUB_ISSUES_LINK } from "../..";
const SiteConfigContext = createContext(null);
export const SiteConfigProvider = ({ config: initConfig, children, }) => {
    const [config, setConfig] = useState(Object.assign({
        baseUrl: "",
        sidebars: [],
        project: {
            title: "",
            key: "",
        },
        reportIssueLink: GITHUB_ISSUES_LINK,
        logo: "",
    }, globalConfig, initConfig || {}));
    const [frontmatter, setFrontmatter] = useState({});
    const [toc, setToc] = useState(null);
    return (React.createElement(SiteConfigContext.Provider, { value: {
            config,
            setConfig,
            frontmatter,
            setFrontmatter,
            toc,
            setToc,
        } }, children));
};
export const useSiteConfig = () => {
    const context = useContext(SiteConfigContext);
    if (!context) {
        throw new Error("useSiteConfig must be used inside a SiteConfigProvider");
    }
    return context;
};
