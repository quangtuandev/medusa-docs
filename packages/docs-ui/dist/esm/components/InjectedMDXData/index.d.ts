import React from "react";
import { FrontMatter, ToCItem } from "types";
type InjectedMDXDataProps = {
    frontmatter: FrontMatter;
    toc: ToCItem[];
};
/**
 * This component is injected by a recma plugin into MDX documents.
 */
export declare const InjectedMDXData: ({ frontmatter, toc }: InjectedMDXDataProps) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map