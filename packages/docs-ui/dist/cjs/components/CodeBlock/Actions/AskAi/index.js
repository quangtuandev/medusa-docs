"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlockAskAiAction = void 0;
const react_1 = __importDefault(require("react"));
const providers_1 = require("../../../../providers");
const clsx_1 = __importDefault(require("clsx"));
const Tooltip_1 = require("../../../Tooltip");
const image_1 = __importDefault(require("next/image"));
const react_sdk_1 = require("@kapaai/react-sdk");
const CodeBlockAskAiAction = ({ source, inHeader, }) => {
    const { setChatOpened, loading } = (0, providers_1.useAiAssistant)();
    const { submitQuery } = (0, react_sdk_1.useChat)();
    const { config } = (0, providers_1.useSiteConfig)();
    const handleClick = () => {
        if (loading) {
            return;
        }
        submitQuery(`\`\`\`tsx\n${source.trim()}\n\`\`\`\n\nExplain the code above`);
        setChatOpened(true);
    };
    return (react_1.default.createElement(Tooltip_1.Tooltip, { text: "Ask AI", tooltipClassName: "font-base", className: (0, clsx_1.default)("group"), innerClassName: (0, clsx_1.default)(inHeader && "flex", "h-fit rounded-docs_sm", "group-hover:bg-medusa-contrast-bg-base-hover group-focus:bg-medusa-contrast-bg-base-hover") },
        react_1.default.createElement("span", { className: (0, clsx_1.default)(!inHeader && "p-[6px]", inHeader && "p-[4.5px]", "cursor-pointer"), onClick: handleClick },
            react_1.default.createElement(image_1.default, { src: `${config.basePath}/images/ai-assistent-luminosity.png`, width: 15, height: 15, alt: "Ask AI" }))));
};
exports.CodeBlockAskAiAction = CodeBlockAskAiAction;
