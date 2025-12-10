import React from "react";
import { CodeBlock, InlineCode, MermaidDiagram, } from "../../components";
import { Npm2YarnCode } from "../Npm2YarnCode";
// due to how mdx handles code blocks
// it is required that a code block specify a language
// to be considered a block. Otherwise, it will be
// considered as inline code
export const CodeMdx = ({ className, children, inlineCodeProps = {}, codeBlockProps = {}, ...rest }) => {
    if (!children) {
        return React.createElement(React.Fragment, null);
    }
    const match = /language-(\w+)/.exec(className || "");
    const codeContent = Array.isArray(children)
        ? children[0]
        : children;
    if (match) {
        if (rest.npm2yarn) {
            return React.createElement(Npm2YarnCode, { npmCode: codeContent, ...rest });
        }
        else if (match[1] === "mermaid") {
            return React.createElement(MermaidDiagram, { diagramContent: codeContent });
        }
        return (React.createElement(CodeBlock, { source: codeContent, lang: match[1], ...codeBlockProps, ...rest }));
    }
    return React.createElement(InlineCode, { ...inlineCodeProps }, codeContent);
};
