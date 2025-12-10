import React from "react";
import { ErrorPageIcon } from "./Icon";
import Link from "next/link";
import { Button } from "../Button";
import { GITHUB_ISSUES_LINK } from "../../constants";
export const ErrorPage = () => {
    return (React.createElement("div", { className: "w-full h-full bg-medusa-bg-subtle flex items-center justify-center" },
        React.createElement("div", { className: "flex gap-docs_1.5 flex-col items-center justify-center w-fit max-w-lg" },
            React.createElement(ErrorPageIcon, null),
            React.createElement("div", { className: "flex flex-col items-center gap-docs_0.5" },
                React.createElement("h1", { className: "text-medusa-fg-base text-2xl" }, "Oops! Something went wrong."),
                React.createElement("span", { className: "text-medusa-fg-subtle txt-large-plus text-pretty text-center" }, "Don\u2019t worry. Our team have automatically been notified of this issue and they are working on it. Please try again later.")),
            React.createElement("div", { className: "flex items-center justify-center gap-docs_0.75" },
                React.createElement(Link, { href: GITHUB_ISSUES_LINK, target: "_blank", rel: "noreferrer" },
                    React.createElement(Button, { variant: "secondary" }, "Report issue")),
                React.createElement(Link, { href: "/", passHref: true },
                    React.createElement(Button, { variant: "primary" }, "Go to homepage"))))));
};
