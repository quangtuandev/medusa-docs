"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlockCopyAction = void 0;
const react_1 = __importStar(require("react"));
const __1 = require("../../../..");
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const CodeBlockCopyAction = ({ source, inHeader, }) => {
    const [copied, setCopied] = (0, react_1.useState)(false);
    const { track } = (0, __1.useAnalytics)();
    (0, react_1.useEffect)(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
            }, 1000);
        }
        track({
            event: {
                event: __1.DocsTrackingEvents.CODE_BLOCK_COPY,
            },
        });
    }, [copied]);
    const iconClassName = [
        "text-medusa-contrast-fg-secondary",
        "group-hover:text-medusa-contrast-fg-primary",
        "group-focus:text-medusa-contrast-fg-primary",
    ];
    return (react_1.default.createElement(__1.CopyButton, { text: source, tooltipClassName: "font-base", className: (0, clsx_1.default)("group"), buttonClassName: (0, clsx_1.default)(!inHeader && "p-[6px]", inHeader && "p-[4.5px]"), tooltipInnerClassName: (0, clsx_1.default)(inHeader && "flex", "h-fit rounded-docs_sm", "group-hover:bg-medusa-contrast-bg-base-hover group-focus:bg-medusa-contrast-bg-base-hover"), onCopy: () => setCopied(true) },
        !copied && react_1.default.createElement(icons_1.SquareTwoStack, { className: (0, clsx_1.default)(iconClassName) }),
        copied && react_1.default.createElement(icons_1.CheckMini, { className: (0, clsx_1.default)(iconClassName) })));
};
exports.CodeBlockCopyAction = CodeBlockCopyAction;
