import clsx from "clsx";
import React from "react";
export const H1 = ({ className, ...props }) => {
    return (React.createElement("div", { className: "flex items-start justify-between gap-2 h1-wrapper" },
        React.createElement("h1", { className: clsx("text-h1 [&_code]:!text-h1 [&_code]:!font-mono mb-docs_1 text-medusa-fg-base", props.id && "scroll-m-docs_7", className), ...props })));
};
