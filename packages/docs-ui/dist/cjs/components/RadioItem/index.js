"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioItem = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const RadioItem = ({ className, checked, ...props }) => {
    return (react_1.default.createElement("div", { className: "p-[3px] flex justify-center items-center relative" },
        react_1.default.createElement("input", { type: "radio", className: (0, clsx_1.default)("appearance-none bg-medusa-bg-component shadow-borders-base dark:shadow-border-base-dark", "w-[14px] h-[14px] rounded-full", "focus:shadow-borders-interactive-with-focus disabled:opacity-50", "checked:!bg-medusa-bg-interactive checked:!shadow-borders-interactive-with-shadow", !checked && "hover:bg-medusa-bg-component-hover", className), checked: checked, ...props }),
        checked && (react_1.default.createElement("span", { className: (0, clsx_1.default)("w-[6px] h-[6px] bg-medusa-bg-base dark:bg-medusa-fg-on-color absolute top-1/2 left-1/2 rounded-full", "-translate-x-1/2 -translate-y-1/2 shadow-details-contrast-on-bg-interactive") }))));
};
exports.RadioItem = RadioItem;
