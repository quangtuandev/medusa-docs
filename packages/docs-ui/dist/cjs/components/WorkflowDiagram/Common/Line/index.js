"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowDiagramLine = void 0;
const react_1 = __importDefault(require("react"));
const Arrow_1 = require("../Arrow");
const WorkflowDiagramLine = ({ step }) => {
    if (!step) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("div", { className: "ml-0 -mr-[7px] w-[60px] pr-[7px]" },
        react_1.default.createElement("div", { className: "flex min-h-[24px] w-full items-start" },
            react_1.default.createElement("div", { className: "flex h-docs_1.5 w-[10px] items-center justify-center" },
                react_1.default.createElement("div", { className: "bg-medusa-button-neutral shadow-borders-base size-[10px] shrink-0 rounded-full" })),
            react_1.default.createElement("div", { className: "pt-[6px]" },
                react_1.default.createElement(Arrow_1.WorkflowDiagramArrow, { depth: step.length })))));
};
exports.WorkflowDiagramLine = WorkflowDiagramLine;
