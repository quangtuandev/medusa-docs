import React from "react";
import { DocsConfig, FrontMatter, ToCItem } from "types";
export type SiteConfigContextType = {
    config: DocsConfig;
    setConfig: React.Dispatch<React.SetStateAction<DocsConfig>>;
    frontmatter: FrontMatter;
    setFrontmatter: React.Dispatch<React.SetStateAction<FrontMatter>>;
    toc: ToCItem[] | null;
    setToc: React.Dispatch<React.SetStateAction<ToCItem[] | null>>;
};
export type SiteConfigProviderProps = {
    config?: DocsConfig;
    children?: React.ReactNode;
};
export declare const SiteConfigProvider: ({ config: initConfig, children, }: SiteConfigProviderProps) => React.JSX.Element;
export declare const useSiteConfig: () => SiteConfigContextType;
//# sourceMappingURL=index.d.ts.map