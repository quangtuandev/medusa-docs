import React from "react";
import { Link } from "../Link";
import { Badge } from "../Badge";
import clsx from "clsx";
import { GithubIcon } from "../Icons/Github";
export const SourceCodeLink = ({ link, text, icon, className, }) => {
    return (React.createElement(Link, { href: link, target: "_blank", rel: "noreferrer", className: clsx("my-docs_0.5 align-middle inline-block", className) },
        React.createElement(Badge, { variant: "neutral", className: "inline-flex hover:bg-medusa-tag-neutral-bg-hover cursor-pointer", childrenWrapperClassName: "inline-flex flex-row gap-[3px] items-center" },
            icon || React.createElement(GithubIcon, null),
            React.createElement("span", null, text || "Source Code"))));
};
