"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconHeadline = void 0;
const react_1 = __importDefault(require("react"));
const IconHeadline = ({ title, icon }) => {
    return (react_1.default.createElement("div", { className: "flex gap-docs_0.5 text-medusa-fg-base" },
        icon,
        react_1.default.createElement("span", { className: "text-small-plus" }, title)));
};
exports.IconHeadline = IconHeadline;
