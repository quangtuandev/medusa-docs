import clsx from "clsx";
import React from "react";
export const CodeBlockCollapsibleFade = ({ type, hasHeader = false, collapsed, }) => {
    if (!collapsed) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement("span", { className: clsx("absolute flex flex-col z-10", hasHeader && "left-[6px] w-[calc(100%-12px)]", !hasHeader && "w-full left-0", type === "start" && [
            hasHeader && "top-[44px]",
            !hasHeader && "top-[36px]",
        ], type === "end" && [
            hasHeader && "bottom-[44px]",
            !hasHeader && "bottom-[36px]",
        ]) },
        type === "end" && (React.createElement("span", { className: clsx("w-full h-[56px]", "bg-code-fade-bottom-to-top dark:bg-code-fade-bottom-to-top-dark") })),
        type === "start" && (React.createElement("span", { className: clsx("w-full h-[56px]", "bg-code-fade-top-to-bottom dark:bg-code-fade-top-to-bottom-dark") }))));
};
