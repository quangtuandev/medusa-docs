import React from "react";
import clsx from "clsx";
import { Details, MarkdownContent } from "../../components";
export const DetailsList = ({ sections }) => {
    return (React.createElement(React.Fragment, null, sections.map(({ title, content }, index) => (React.createElement(Details, { summaryContent: title, key: index, className: clsx(index !== 0 && "border-t-0") },
        React.isValidElement(content) && content,
        !React.isValidElement(content) && typeof content === "string" && (React.createElement(MarkdownContent, null, content)))))));
};
