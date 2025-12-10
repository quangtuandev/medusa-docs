"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyGeneratedSnippetButton = void 0;
const react_1 = __importDefault(require("react"));
const __1 = require("../..");
const icons_1 = require("@medusajs/icons");
const CopyGeneratedSnippetButton = ({ tooltipText, ...props }) => {
    const { snippet } = (0, __1.useGenerateSnippet)(props);
    return (react_1.default.createElement(__1.CopyButton, { text: snippet, tooltipText: tooltipText, className: "inline-block w-fit" }, ({ isCopied }) => {
        if (isCopied) {
            return react_1.default.createElement(icons_1.CheckCircle, null);
        }
        return react_1.default.createElement(icons_1.SquareTwoStack, null);
    }));
};
exports.CopyGeneratedSnippetButton = CopyGeneratedSnippetButton;
