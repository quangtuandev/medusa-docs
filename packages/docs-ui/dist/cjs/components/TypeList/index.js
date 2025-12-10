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
exports.TypeList = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const components_1 = require("../../components");
const TypeListItems = (0, react_1.lazy)(async () => Promise.resolve().then(() => __importStar(require("./Items"))));
const TypeList = ({ types, className, sectionTitle, expandUrl, openedLevel, ...props }) => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("bg-medusa-bg-subtle rounded my-docs_1", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", className), ...props },
        react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(components_1.Loading, null) },
            react_1.default.createElement(TypeListItems, { types: types, expandUrl: expandUrl, sectionTitle: sectionTitle, openedLevel: openedLevel }))));
};
exports.TypeList = TypeList;
