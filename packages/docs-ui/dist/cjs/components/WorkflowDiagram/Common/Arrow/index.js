"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowDiagramArrow = void 0;
const react_1 = __importDefault(require("react"));
const Horizontal_1 = require("./Horizontal");
const End_1 = require("./End");
const Middle_1 = require("./Middle");
const WorkflowDiagramArrow = ({ depth }) => {
    if (depth === 1) {
        return react_1.default.createElement(Horizontal_1.WorkflowDiagramArrowHorizontal, null);
    }
    if (depth === 2) {
        return (react_1.default.createElement("div", { className: "flex flex-col items-end" },
            react_1.default.createElement(Horizontal_1.WorkflowDiagramArrowHorizontal, null),
            react_1.default.createElement(End_1.WorkflowDiagramArrowEnd, null)));
    }
    const inbetween = Array.from({ length: depth - 2 }).map((_, index) => (react_1.default.createElement(Middle_1.WorkflowDiagramArrowMiddle, { key: index })));
    return (react_1.default.createElement("div", { className: "flex flex-col items-end" },
        react_1.default.createElement(Horizontal_1.WorkflowDiagramArrowHorizontal, null),
        inbetween,
        react_1.default.createElement(End_1.WorkflowDiagramArrowEnd, null)));
};
exports.WorkflowDiagramArrow = WorkflowDiagramArrow;
