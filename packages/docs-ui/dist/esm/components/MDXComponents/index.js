import React from "react";
import { CodeMdx, Details, Kbd, Note, Card, CardList, DetailsSummary, ZoomImg, H1, H2, H3, H4, Link, } from "../../components";
import clsx from "clsx";
import { Text } from "@medusajs/ui";
export const MDXComponents = {
    code: CodeMdx,
    kbd: Kbd,
    Kbd,
    Note,
    details: Details,
    Details: ({ className, ...props }) => {
        return React.createElement(Details, { ...props, className: clsx(className, "my-docs_1") });
    },
    Summary: DetailsSummary,
    Card,
    CardList,
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    p: ({ className, ...props }) => {
        return (React.createElement("p", { className: clsx("text-medusa-fg-base [&:not(:last-child)]:mb-docs_1.5 last:!mb-0", className), ...props }));
    },
    ul: ({ className, children, ...props }) => {
        return (React.createElement("ul", { ...props, className: clsx("list-disc px-docs_1 mb-docs_1.5 [&_ul]:mb-0 [&_ol]:mb-0 [&_p]:!mb-0", className) }, children));
    },
    ol: ({ className, children, ...props }) => {
        return (React.createElement("ol", { ...props, className: clsx("list-decimal px-docs_1 mb-docs_1.5 [&_ul]:mb-0 [&_ol]:mb-0 [&_p]:!mb-0", className) }, children));
    },
    li: ({ className, children, ...props }) => {
        return (React.createElement("li", { className: clsx("text-medusa-fg-base [&:not(:last-child)]:mb-docs_0.5", "[&_ol]:mt-docs_0.5 [&_ul]:mt-docs_0.5", className), ...props },
            React.createElement(Text, { as: "span" }, children)));
    },
    hr: ({ className, ...props }) => {
        return (React.createElement("hr", { className: clsx("my-docs_2 h-[1px] w-full border-0 bg-medusa-border-base", className), ...props }));
    },
    img: (props) => {
        // omit key to resolve errors
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { key, ...rest } = props;
        return React.createElement(ZoomImg, { ...rest });
    },
    a: (props) => React.createElement(Link, { ...props, variant: "content" }),
    strong: ({ className, ...props }) => {
        return React.createElement("strong", { className: clsx("txt-medium-plus", className), ...props });
    },
};
export const Hr = MDXComponents["hr"];
