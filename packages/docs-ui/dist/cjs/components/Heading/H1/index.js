"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.H1 = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const H1 = ({ className, ...props }) => {
    return (react_1.default.createElement("div", { className: "flex items-start justify-between gap-2 h1-wrapper" },
        react_1.default.createElement("h1", { className: (0, clsx_1.default)("text-h1 [&_code]:!text-h1 [&_code]:!font-mono mb-docs_1 text-medusa-fg-base", props.id && "scroll-m-docs_7", className), ...props })));
};
exports.H1 = H1;
