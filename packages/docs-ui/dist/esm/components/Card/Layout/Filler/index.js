import React from "react";
import clsx from "clsx";
import Link from "next/link";
export const CardFillerLayout = ({ text, href, className }) => {
    return (React.createElement("div", { className: clsx("flex justify-center items-center w-full", "gap-docs_0.75 px-docs_0.75 py-docs_0.5 rounded-docs_DEFAULT", "border border-dashed border-medusa-border-strong", "bg-medusa-bg-component text-medusa-fg-subtle", className) },
        React.createElement("div", null,
            React.createElement("span", { className: "text-compact-small" }, text),
            href && (React.createElement(React.Fragment, null,
                " ",
                React.createElement(Link, { href: href, className: "text-compact-small-plus" }, "Show All\u2197"))))));
};
