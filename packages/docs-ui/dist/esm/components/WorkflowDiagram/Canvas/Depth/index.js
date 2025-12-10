"use client";
import React from "react";
import { WorkflowDiagramStepNode } from "../../Common/Node";
import { WorkflowDiagramLine } from "../../Common/Line";
export const WorkflowDiagramCanvasDepth = ({ cluster, next, }) => {
    return (React.createElement("div", { className: "flex items-start" },
        React.createElement("div", { className: "flex flex-col justify-center gap-y-docs_0.5" }, cluster.map((step, index) => (React.createElement(WorkflowDiagramStepNode, { key: `${step.name}-${index}`, step: step })))),
        React.createElement(WorkflowDiagramLine, { step: next })));
};
