import React from "react";
import { Options as ReactMarkdownOptions, Components } from "react-markdown";
export type MarkdownContentProps = ReactMarkdownOptions & {
    components?: Partial<Components> | null | undefined;
};
export declare const MarkdownContent: ({ children, components, ...props }: MarkdownContentProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map