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
exports.Tooltip = void 0;
const react_1 = __importStar(require("react"));
const react_tooltip_1 = require("react-tooltip");
const clsx_1 = __importDefault(require("clsx"));
require("react-tooltip/dist/react-tooltip.css");
exports.Tooltip = (0, react_1.forwardRef)(function Tooltip({ text = "", tooltipClassName = "", children, html = "", tooltipChildren, className, innerClassName, ...tooltipProps }, ref) {
    const elementId = (0, react_1.useId)();
    return (react_1.default.createElement("span", { className: (0, clsx_1.default)(className, "notranslate"), translate: "no", ref: ref },
        react_1.default.createElement("span", { id: elementId, "data-tooltip-content": text, "data-tooltip-html": html, "data-tooltip-id": elementId, className: innerClassName }, children),
        react_1.default.createElement(react_tooltip_1.Tooltip, { anchorId: elementId, 
            // anchorSelect={elementId ? `#${elementId}` : undefined}
            className: (0, clsx_1.default)("!text-compact-x-small !shadow-elevation-tooltip dark:!shadow-elevation-tooltip-dark !rounded-docs_DEFAULT", "!py-docs_0.25 !z-[399] hidden !px-docs_0.5 lg:block", "!bg-medusa-bg-component", "!text-medusa-fg-base text-center", tooltipClassName), wrapper: "span", noArrow: true, positionStrategy: "fixed", opacity: 1, ...tooltipProps }, tooltipChildren)));
});
