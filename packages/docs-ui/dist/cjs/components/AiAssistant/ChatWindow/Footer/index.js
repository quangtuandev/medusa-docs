"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAssistantChatWindowFooter = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const Kbd_1 = require("../../../Kbd");
const Kapa_1 = require("../../../Icons/Kapa");
const Tooltip_1 = require("../../../Tooltip");
const AiAssistantChatWindowFooter = () => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("bg-medusa-bg-component border-t border-medusa-border-base", "flex items-center justify-between gap-docs_0.75 text-compact-x-small", "py-docs_0.75 px-docs_1") },
        react_1.default.createElement(Tooltip_1.Tooltip, { text: "Powered by Kapa.ai" },
            react_1.default.createElement("a", { href: "https://kapa.ai", target: "_blank", rel: "noreferrer" },
                react_1.default.createElement(Kapa_1.KapaIcon, { className: "text-medusa-fg-disabled hover:text-medusa-fg-muted transition-colors" }))),
        react_1.default.createElement("div", { className: "flex items-center justify-end gap-docs_0.75" },
            react_1.default.createElement("span", { className: "text-medusa-fg-muted" }, "Chat is cleared on refresh"),
            react_1.default.createElement("span", { className: "h-docs_0.75 w-px bg-medusa-border-base" }),
            react_1.default.createElement("div", { className: "flex items-center gap-docs_0.5" },
                react_1.default.createElement("span", { className: "text-medusa-fg-subtle" }, "Line break"),
                react_1.default.createElement("div", { className: "flex items-center gap-[5px]" },
                    react_1.default.createElement(Kbd_1.Kbd, { className: "bg-medusa-bg-field-component border-medusa-border-strong w-[18px] h-[18px] inline-block p-0" }, "\u21E7"),
                    react_1.default.createElement(Kbd_1.Kbd, { className: "bg-medusa-bg-field-component border-medusa-border-strong w-[18px] h-[18px] inline-block p-0" }, "\u21B5"))))));
};
exports.AiAssistantChatWindowFooter = AiAssistantChatWindowFooter;
