"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowDiagramDepth = void 0;
const react_1 = __importDefault(require("react"));
const Node_1 = require("../../Common/Node");
const Line_1 = require("../../Common/Line");
const WorkflowDiagramDepth = ({ cluster, next, }) => {
    return (react_1.default.createElement("div", { className: "flex items-start" },
        react_1.default.createElement("div", { className: "flex flex-col justify-center gap-y-docs_0.5" }, cluster.map((step, index) => (react_1.default.createElement(Node_1.WorkflowDiagramStepNode, { key: `${step.name}-${index}`, step: step })))),
        react_1.default.createElement(Line_1.WorkflowDiagramLine, { step: next })));
};
exports.WorkflowDiagramDepth = WorkflowDiagramDepth;
