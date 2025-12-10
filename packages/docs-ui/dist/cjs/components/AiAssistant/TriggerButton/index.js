"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAssistantTriggerButton = void 0;
const react_1 = __importDefault(require("react"));
const Button_1 = require("../../Button");
const Tooltip_1 = require("../../Tooltip");
const Kbd_1 = require("../../Kbd");
const utils_1 = require("../../../utils");
const providers_1 = require("../../../providers");
const hooks_1 = require("../../../hooks");
const image_1 = __importDefault(require("next/image"));
const AI_ASSISTANT_ICON_ACTIVE = "/images/ai-assistent.png";
const AiAssistantTriggerButton = () => {
    const { config } = (0, providers_1.useSiteConfig)();
    const { setChatOpened } = (0, providers_1.useAiAssistant)();
    const { setIsOpen } = (0, providers_1.useSearch)();
    const osShortcut = (0, utils_1.getOsShortcut)();
    (0, hooks_1.useKeyboardShortcut)({
        metakey: true,
        shortcutKeys: ["i"],
        action: () => {
            setChatOpened((prev) => !prev);
            setIsOpen(false);
        },
        checkEditing: false,
    });
    return (react_1.default.createElement(Tooltip_1.Tooltip, { render: () => (react_1.default.createElement("span", { className: "flex gap-[5px] items-center" },
            react_1.default.createElement(Kbd_1.Kbd, { className: "bg-medusa-bg-field-component border-medusa-border-strong w-[18px] h-[18px] inline-block" }, osShortcut),
            react_1.default.createElement(Kbd_1.Kbd, { className: "bg-medusa-bg-field-component border-medusa-border-strong w-[18px] h-[18px] inline-block" }, "i"))) },
        react_1.default.createElement(Button_1.Button, { variant: "transparent-clear", onClick: () => setChatOpened((prev) => !prev) },
            react_1.default.createElement(image_1.default, { src: `${config.basePath}${AI_ASSISTANT_ICON_ACTIVE}`, width: 15, height: 15, alt: "AI Assistant" }),
            react_1.default.createElement("span", { className: "hidden md:inline-block text-medusa-fg-subtle" }, "Ask AI"))));
};
exports.AiAssistantTriggerButton = AiAssistantTriggerButton;
