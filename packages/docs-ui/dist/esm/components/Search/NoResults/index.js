import { MagnifierAlert } from "@medusajs/icons";
import clsx from "clsx";
import React from "react";
export const SearchNoResult = () => {
    return (React.createElement("div", { className: clsx("flex h-full w-full flex-col items-center justify-center gap-docs_0.75") },
        React.createElement(MagnifierAlert, { className: "text-medusa-fg-base" }),
        React.createElement("div", { className: clsx("flex flex-col justify-center items-center gap-docs_0.25", "max-w-[360px]") },
            React.createElement("span", { className: "text-compact-small-plus text-medusa-fg-subtle" }, "No results found."),
            React.createElement("span", { className: "text-medusa-fg-muted txt-small text-center" }, "We couldn't find any matches for your search. Please try changing the filters or using different keywords."))));
};
