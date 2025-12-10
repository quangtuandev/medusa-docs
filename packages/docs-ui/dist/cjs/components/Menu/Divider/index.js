"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuDivider = void 0;
const react_1 = __importDefault(require("react"));
const MenuDivider = () => {
    return (react_1.default.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 205 8", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        react_1.default.createElement("rect", { width: "197", height: "8", transform: "translate(4)", fill: "var(--docs-bg-component)" }),
        react_1.default.createElement("rect", { x: "-4", y: "3", width: "213", height: "1", fill: "var(--docs-border-menu-top)" }),
        react_1.default.createElement("rect", { x: "-4", y: "4", width: "213", height: "1", fill: "var(--docs-border-menu-bot)" })));
};
exports.MenuDivider = MenuDivider;
