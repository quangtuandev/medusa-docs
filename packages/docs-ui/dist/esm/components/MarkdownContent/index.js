import React from "react";
import ReactMarkdown from "react-markdown";
import { MDXComponents } from "../../components";
import clsx from "clsx";
export const MarkdownContent = ({ children, components, ...props }) => {
    return (
    // @ts-expect-error React v19 doesn't see this type as a React element
    React.createElement(ReactMarkdown, { components: components || {
            ...MDXComponents,
            pre: ({ className, children, ...props }) => {
                return (React.createElement("pre", { className: clsx("p-0 bg-transparent", className), ...props }, children));
            },
        }, ...props }, children));
};
