import clsx from "clsx";
import React from "react";
export const H4 = ({ className, ...props }) => {
    return (React.createElement("h4", { className: clsx("mb-docs_1 text-medusa-fg-base text-h4", className), ...props }));
};
