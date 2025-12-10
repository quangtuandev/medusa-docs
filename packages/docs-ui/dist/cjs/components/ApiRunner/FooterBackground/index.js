"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRunnerFooterBackground = void 0;
const react_1 = __importDefault(require("react"));
const ApiRunnerFooterBackground = () => {
    return (react_1.default.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 641 44", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "absolute top-0 left-0" },
        react_1.default.createElement("rect", { width: "640", height: "44", transform: "translate(0.5)", fill: "var(--docs-bg-component)" }),
        react_1.default.createElement("rect", { width: "640", height: "44", transform: "translate(0.5)", fill: "url(#pattern0_10459_12087)", fillOpacity: "0.04" }),
        react_1.default.createElement("defs", null,
            react_1.default.createElement("pattern", { id: "pattern0_10459_12087", patternContentUnits: "objectBoundingBox", width: "0.009375", height: "0.136364" },
                react_1.default.createElement("use", { xlinkHref: "#image0_10459_12087", transform: "scale(0.0015625 0.0227273)" })),
            react_1.default.createElement("image", { id: "image0_10459_12087", width: "6", height: "6", xlinkHref: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC" }))));
};
exports.ApiRunnerFooterBackground = ApiRunnerFooterBackground;
