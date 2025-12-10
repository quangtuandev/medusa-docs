"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowDiagramList = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../../utils");
const Depth_1 = require("./Depth");
const Legend_1 = require("../Common/Legend");
const WorkflowDiagramList = ({ workflow, hideLegend = false, }) => {
    const clusters = (0, utils_1.createNodeClusters)(workflow.steps);
    return (react_1.default.createElement("div", { className: "flex flex-col gap-docs_1 my-docs_1 w-fit" },
        react_1.default.createElement("div", { className: "workflow-list-diagram flex flex-col gap-docs_0.5 w-fit" }, Object.entries(clusters).map(([depth, cluster]) => {
            const next = (0, utils_1.getNextCluster)(clusters, Number(depth));
            return (react_1.default.createElement(Depth_1.WorkflowDiagramListDepth, { cluster: cluster, next: next, key: depth }));
        })),
        react_1.default.createElement(Legend_1.WorkflowDiagramLegend, { hideLegend: hideLegend })));
};
exports.WorkflowDiagramList = WorkflowDiagramList;
