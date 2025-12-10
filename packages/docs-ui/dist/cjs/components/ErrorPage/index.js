"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorPage = void 0;
const react_1 = __importDefault(require("react"));
const Icon_1 = require("./Icon");
const link_1 = __importDefault(require("next/link"));
const Button_1 = require("../Button");
const constants_1 = require("../../constants");
const ErrorPage = () => {
    return (react_1.default.createElement("div", { className: "w-full h-full bg-medusa-bg-subtle flex items-center justify-center" },
        react_1.default.createElement("div", { className: "flex gap-docs_1.5 flex-col items-center justify-center w-fit max-w-lg" },
            react_1.default.createElement(Icon_1.ErrorPageIcon, null),
            react_1.default.createElement("div", { className: "flex flex-col items-center gap-docs_0.5" },
                react_1.default.createElement("h1", { className: "text-medusa-fg-base text-2xl" }, "Oops! Something went wrong."),
                react_1.default.createElement("span", { className: "text-medusa-fg-subtle txt-large-plus text-pretty text-center" }, "Don\u2019t worry. Our team have automatically been notified of this issue and they are working on it. Please try again later.")),
            react_1.default.createElement("div", { className: "flex items-center justify-center gap-docs_0.75" },
                react_1.default.createElement(link_1.default, { href: constants_1.GITHUB_ISSUES_LINK, target: "_blank", rel: "noreferrer" },
                    react_1.default.createElement(Button_1.Button, { variant: "secondary" }, "Report issue")),
                react_1.default.createElement(link_1.default, { href: "/", passHref: true },
                    react_1.default.createElement(Button_1.Button, { variant: "primary" }, "Go to homepage"))))));
};
exports.ErrorPage = ErrorPage;
