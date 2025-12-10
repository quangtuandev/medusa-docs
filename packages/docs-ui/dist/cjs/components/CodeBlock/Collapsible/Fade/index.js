"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlockCollapsibleFade = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const CodeBlockCollapsibleFade = ({ type, hasHeader = false, collapsed, }) => {
    if (!collapsed) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("span", { className: (0, clsx_1.default)("absolute flex flex-col z-10", hasHeader && "left-[6px] w-[calc(100%-12px)]", !hasHeader && "w-full left-0", type === "start" && [
            hasHeader && "top-[44px]",
            !hasHeader && "top-[36px]",
        ], type === "end" && [
            hasHeader && "bottom-[44px]",
            !hasHeader && "bottom-[36px]",
        ]) },
        type === "end" && (react_1.default.createElement("span", { className: (0, clsx_1.default)("w-full h-[56px]", "bg-code-fade-bottom-to-top dark:bg-code-fade-bottom-to-top-dark") })),
        type === "start" && (react_1.default.createElement("span", { className: (0, clsx_1.default)("w-full h-[56px]", "bg-code-fade-top-to-bottom dark:bg-code-fade-top-to-bottom-dark") }))));
};
exports.CodeBlockCollapsibleFade = CodeBlockCollapsibleFade;
