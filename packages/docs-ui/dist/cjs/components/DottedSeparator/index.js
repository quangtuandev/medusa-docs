"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DottedSeparator = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const DottedSeparator = ({ className, wrapperClassName, }) => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("px-docs_0.75 my-docs_0.75", wrapperClassName) },
        react_1.default.createElement("span", { className: (0, clsx_1.default)("block w-full h-px relative bg-border-dotted", "bg-[length:4px_1px] bg-repeat-x bg-bottom", className) })));
};
exports.DottedSeparator = DottedSeparator;
