"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlockInline = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const CodeBlockInline = ({ source }) => {
    return (react_1.default.createElement("pre", { className: (0, clsx_1.default)("px-[6px] bg-medusa-tag-neutral-bg", "w-full my-docs_0.5 rounded-docs_sm", "border border-medusa-tag-neutral-border", "whitespace-pre-wrap") },
        react_1.default.createElement("code", { className: "w-full text-code-label text-medusa-tag-neutral-text" }, source)));
};
exports.CodeBlockInline = CodeBlockInline;
