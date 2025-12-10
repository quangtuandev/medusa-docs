"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlockCollapsibleLines = void 0;
const react_1 = __importDefault(require("react"));
const CodeBlockCollapsibleLines = ({ children, type, collapsed, }) => {
    const isStart = type === "start";
    return (react_1.default.createElement(react_1.default.Fragment, null, collapsed && Array.isArray(children)
        ? children.slice(isStart ? -2 : 0, isStart ? undefined : 2)
        : children));
};
exports.CodeBlockCollapsibleLines = CodeBlockCollapsibleLines;
