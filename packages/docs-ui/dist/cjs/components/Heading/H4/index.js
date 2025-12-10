"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.H4 = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const H4 = ({ className, ...props }) => {
    return (react_1.default.createElement("h4", { className: (0, clsx_1.default)("mb-docs_1 text-medusa-fg-base text-h4", className), ...props }));
};
exports.H4 = H4;
