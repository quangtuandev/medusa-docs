"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeImage = void 0;
const react_1 = __importDefault(require("react"));
const providers_1 = require("../../providers");
const ThemeImage = ({ light, dark, alt = "", ...props }) => {
    const { colorMode } = (0, providers_1.useColorMode)();
    return (react_1.default.createElement("img", { alt: alt, src: colorMode === "light" ? light : dark || light, ...props }));
};
exports.ThemeImage = ThemeImage;
