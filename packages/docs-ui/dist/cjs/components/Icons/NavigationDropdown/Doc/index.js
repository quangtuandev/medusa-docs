"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationDropdownDocIcon = void 0;
const react_1 = __importDefault(require("react"));
const NavigationDropdownDocIcon = (props) => {
    return (react_1.default.createElement("svg", { width: props.width || 20, height: props.height || 20, viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props },
        react_1.default.createElement("rect", { width: "20", height: "20", className: "fill-medusa-fg-base dark:fill-medusa-bg-base" }),
        react_1.default.createElement("g", { clipPath: "url(#clip0_9988_95547)" },
            react_1.default.createElement("path", { d: "M14.25 16H7.25C6.009 16 5 14.991 5 13.75C5 13.336 5.336 13 5.75 13C6.164 13 6.5 13.336 6.5 13.75C6.5 14.164 6.836 14.5 7.25 14.5H14.25C14.664 14.5 15 14.836 15 15.25C15 15.664 14.664 16 14.25 16Z", className: "fill-medusa-fg-on-color" }),
            react_1.default.createElement("path", { d: "M12.75 4H7.25C6.009 4 5 5.009 5 6.25V13.75C5 14.164 5.336 14.5 5.75 14.5C6.164 14.5 6.5 14.164 6.5 13.75C6.5 13.336 6.836 13 7.25 13H14.25C14.664 13 15 12.664 15 12.25V6.25C15 5.009 13.991 4 12.75 4ZM11.25 9H8.75C8.336 9 8 8.664 8 8.25C8 7.836 8.336 7.5 8.75 7.5H11.25C11.664 7.5 12 7.836 12 8.25C12 8.664 11.664 9 11.25 9Z", className: "fill-medusa-fg-on-color" })),
        react_1.default.createElement("defs", null,
            react_1.default.createElement("clipPath", { id: "clip0_9988_95547" },
                react_1.default.createElement("rect", { width: "12", height: "12", className: "fill-medusa-fg-on-color", transform: "translate(4 4)" })))));
};
exports.NavigationDropdownDocIcon = NavigationDropdownDocIcon;
