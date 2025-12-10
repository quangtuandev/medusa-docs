"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineThemeImage = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const __1 = require("../..");
const InlineThemeImage = (props) => {
    return (react_1.default.createElement(__1.ThemeImage, { ...props, width: 20, height: 20, className: (0, clsx_1.default)(props.className, "inline") }));
};
exports.InlineThemeImage = InlineThemeImage;
