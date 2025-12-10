"use strict";
"use client";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowDiagram = void 0;
const react_1 = __importStar(require("react"));
const __1 = require("../..");
const Canvas_1 = require("./Canvas");
const List_1 = require("./List");
const WorkflowDiagram = ({ type = "list", ...props }) => {
    return (react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(__1.Loading, null) },
        type === "canvas" && react_1.default.createElement(Canvas_1.WorkflowDiagramCanvas, { ...props }),
        type === "list" && react_1.default.createElement(List_1.WorkflowDiagramList, { ...props })));
};
exports.WorkflowDiagram = WorkflowDiagram;
