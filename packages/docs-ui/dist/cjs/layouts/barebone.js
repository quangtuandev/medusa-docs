"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BareboneLayout = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const google_1 = require("@next/third-parties/google");
const BareboneLayout = ({ htmlClassName, children, gaId, }) => {
    return (react_1.default.createElement("html", { lang: "en", className: (0, clsx_1.default)("h-full w-full", htmlClassName) },
        react_1.default.createElement("head", null),
        children,
        react_1.default.createElement(google_1.GoogleAnalytics, { gaId: gaId || "temp" })));
};
exports.BareboneLayout = BareboneLayout;
