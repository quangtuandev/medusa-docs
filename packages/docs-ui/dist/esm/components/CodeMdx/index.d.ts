import React from "react";
import { CodeBlockMetaFields, CodeBlockProps, InlineCodeProps } from "../../components";
export type CodeMdxProps = {
    className?: string;
    children?: React.ReactNode;
    inlineCodeProps?: Partial<InlineCodeProps>;
    codeBlockProps?: Partial<CodeBlockProps>;
} & CodeBlockMetaFields;
export declare const CodeMdx: ({ className, children, inlineCodeProps, codeBlockProps, ...rest }: CodeMdxProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map