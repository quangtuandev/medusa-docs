import React from "react";
export const IconHeadline = ({ title, icon }) => {
    return (React.createElement("div", { className: "flex gap-docs_0.5 text-medusa-fg-base" },
        icon,
        React.createElement("span", { className: "text-small-plus" }, title)));
};
