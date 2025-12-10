"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAssistantChatWindowHeader = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const Tooltip_1 = require("../../../Tooltip");
const Link_1 = require("../../../Link");
const icons_1 = require("@medusajs/icons");
const Button_1 = require("../../../Button");
const providers_1 = require("../../../../providers");
const AiAssistantChatWindowHeader = () => {
    const { setChatOpened } = (0, providers_1.useAiAssistant)();
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex gap-docs_0.5 items-center justify-between", "w-full px-docs_1 py-docs_0.75 rounded-t-docs_sm", "border-medusa-border-base border-b") },
        react_1.default.createElement("div", { className: "flex gap-[6px] items-center" },
            react_1.default.createElement("span", { className: "text-h3 text-medusa-fg-base" }, "Ask Anything"),
            react_1.default.createElement(Tooltip_1.Tooltip, { tooltipChildren: react_1.default.createElement(react_1.default.Fragment, null,
                    "This site is protected by reCAPTCHA and",
                    react_1.default.createElement("br", null),
                    "the",
                    " ",
                    react_1.default.createElement(Link_1.Link, { href: "https://policies.google.com/privacy" }, "Google Privacy Policy"),
                    " ",
                    "and ",
                    react_1.default.createElement(Link_1.Link, { href: "https://policies.google.com/terms" }, "ToS"),
                    " ",
                    "apply"), clickable: true, tooltipClassName: "!text-compact-small-plus" },
                react_1.default.createElement(icons_1.ShieldCheck, { className: "text-medusa-fg-muted" }))),
        react_1.default.createElement(Button_1.Button, { variant: "transparent-clear", className: "!p-[6.5px] rounded-docs_sm", onClick: () => setChatOpened(false) },
            react_1.default.createElement(icons_1.XMark, { className: "text-medusa-fg-muted", height: 15, width: 15 }))));
};
exports.AiAssistantChatWindowHeader = AiAssistantChatWindowHeader;
