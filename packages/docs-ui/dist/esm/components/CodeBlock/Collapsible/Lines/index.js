import React from "react";
export const CodeBlockCollapsibleLines = ({ children, type, collapsed, }) => {
    const isStart = type === "start";
    return (React.createElement(React.Fragment, null, collapsed && Array.isArray(children)
        ? children.slice(isStart ? -2 : 0, isStart ? undefined : 2)
        : children));
};
