"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WideSection = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const WideSection = ({ children, className, as = "div", }) => {
    const Component = as;
    return (react_1.default.createElement(Component, { className: (0, clsx_1.default)("max-w-inner-content-xs sm:max-w-inner-content-sm md:max-w-inner-content-md", "lg:max-w-lg-wide-content xl:max-w-xl-wide-content px-1 lg:px-0 mx-auto", className) }, children));
};
exports.WideSection = WideSection;
