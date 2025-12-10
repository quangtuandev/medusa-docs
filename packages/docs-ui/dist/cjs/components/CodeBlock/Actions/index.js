"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlockActions = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const components_1 = require("../../../components");
const icons_1 = require("@medusajs/icons");
const constants_1 = require("../../../constants");
const Copy_1 = require("./Copy");
const AskAi_1 = require("./AskAi");
const CodeBlockActions = ({ source, inHeader, showGradientBg = true, inInnerCode = false, isCollapsed, isSingleLine = false, canShowApiTesting = false, onApiTesting, noReport = false, noCopy = false, noAskAi = false, }) => {
    const iconClassName = [
        "text-medusa-contrast-fg-secondary",
        "group-hover:text-medusa-contrast-fg-primary",
        "group-focus:text-medusa-contrast-fg-primary",
    ];
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("hidden md:block", !inHeader &&
            "xs:rounded xs:absolute xs:right-0 xs:top-0 xs:w-[calc(17%+10px)] xs:h-full") },
        !inHeader && (react_1.default.createElement("div", { className: (0, clsx_1.default)(!inHeader &&
                showGradientBg && [
                inInnerCode &&
                    "xs:bg-subtle-code-fade-right-to-left dark:xs:bg-subtle-code-fade-right-to-left-dark",
                !inInnerCode &&
                    "xs:bg-base-code-fade-right-to-left dark:xs:bg-base-code-fade-right-to-left-dark",
            ], (inHeader || !showGradientBg) && "xs:bg-transparent", "z-[9] w-full h-full absolute top-0 left-0") })),
        react_1.default.createElement("div", { className: (0, clsx_1.default)("md:flex md:justify-end md:gap-docs_0.25 relative", !inHeader && [
                "md:pr-docs_0.5 z-[11]",
                isCollapsed && "md:pt-docs_2.5",
                !isCollapsed && [
                    isSingleLine && "md:pt-docs_0.25",
                    !isSingleLine && "md:pt-docs_0.5",
                ],
            ]) },
            !noAskAi && (react_1.default.createElement(AskAi_1.CodeBlockAskAiAction, { source: source, inHeader: inHeader })),
            canShowApiTesting && (react_1.default.createElement(components_1.Tooltip, { text: "Test API", tooltipClassName: "font-base", className: (0, clsx_1.default)("group"), innerClassName: (0, clsx_1.default)(inHeader && "flex", "h-fit rounded-docs_sm", "group-hover:bg-medusa-contrast-bg-base-hover group-focus:bg-medusa-contrast-bg-base-hover") },
                react_1.default.createElement("span", { className: (0, clsx_1.default)(!inHeader && "p-[6px]", inHeader && "p-[4.5px]", "cursor-pointer"), onClick: () => onApiTesting?.(true) },
                    react_1.default.createElement(icons_1.PlaySolid, { className: (0, clsx_1.default)(iconClassName) })))),
            !noReport && (react_1.default.createElement(components_1.Tooltip, { text: "Report Issue", tooltipClassName: "font-base", className: (0, clsx_1.default)("group"), innerClassName: (0, clsx_1.default)(inHeader && "flex", "h-fit rounded-docs_sm", "group-hover:bg-medusa-contrast-bg-base-hover group-focus:bg-medusa-contrast-bg-base-hover") },
                react_1.default.createElement(components_1.Link, { href: constants_1.GITHUB_ISSUES_LINK, target: "_blank", className: (0, clsx_1.default)("bg-transparent border-none cursor-pointer rounded", "[&:not(:first-child)]:ml-docs_0.5", "inline-flex justify-center items-center invisible xs:visible", !inHeader && "p-[6px]", inHeader && "p-[4.5px]"), rel: "noreferrer" },
                    react_1.default.createElement(icons_1.ExclamationCircle, { className: (0, clsx_1.default)(iconClassName) })))),
            !noCopy && react_1.default.createElement(Copy_1.CodeBlockCopyAction, { source: source, inHeader: inHeader }))));
};
exports.CodeBlockActions = CodeBlockActions;
