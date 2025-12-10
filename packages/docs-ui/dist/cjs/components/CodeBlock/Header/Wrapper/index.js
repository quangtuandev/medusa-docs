"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlockHeaderWrapper = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const providers_1 = require("../../../../providers");
exports.CodeBlockHeaderWrapper = react_1.default.forwardRef(function CodeBlockHeaderWrapper({ children, blockStyle = "loud" }, ref) {
    const { colorMode } = (0, providers_1.useColorMode)();
    const bgColor = (0, react_1.useMemo)(() => (0, clsx_1.default)(blockStyle === "loud" && "bg-medusa-contrast-bg-base", blockStyle === "subtle" && [
        colorMode === "light" && "bg-medusa-bg-component",
        colorMode === "dark" && "bg-medusa-code-bg-header",
    ]), [blockStyle, colorMode]);
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("py-docs_0.5 px-docs_1 mb-0", "rounded-t-docs_lg relative flex justify-between items-center", blockStyle === "subtle" && [
            "border border-solid border-b-0",
            colorMode === "light" && "border-medusa-border-base",
            colorMode === "dark" && "border-medusa-code-border",
        ], bgColor), ref: ref }, children));
});
