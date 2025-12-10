import React from "react";
import clsx from "clsx";
export const SearchHitGroupName = ({ name }) => {
    return (React.createElement("span", { className: clsx("pb-docs_0.25 flex px-docs_0.5 pt-docs_0.75", "text-medusa-fg-muted", "text-compact-x-small-plus") }, name));
};
