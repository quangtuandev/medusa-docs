import clsx from "clsx";
import React from "react";
export const SearchSuggestionItem = ({ children, onClick, className, ...rest }) => {
    return (React.createElement("div", { className: clsx("flex items-center justify-between gap-docs_0.75", "cursor-pointer rounded-docs_sm p-docs_0.5", "hover:bg-medusa-bg-base-hover", "focus:bg-medusa-bg-base-hover", "focus:outline-none last:mb-docs_1", "text-medusa-fg-base text-compact-small", className), onClick: onClick, "data-hit": true, ...rest }, children));
};
