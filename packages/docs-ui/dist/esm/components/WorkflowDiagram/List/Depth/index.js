"use client";
import React from "react";
import { WorkflowDiagramStepNode } from "../../Common/Node";
import { WorkflowDiagramLine } from "../../Common/Line";
export const WorkflowDiagramListDepth = ({ cluster, }) => {
    return (React.createElement("div", { className: "flex items-start workflow-node-group w-fit" },
        React.createElement(WorkflowDiagramLine, { step: cluster }),
        React.createElement("div", { className: "flex flex-col justify-center gap-y-docs_0.5" }, cluster.map((step, index) => (React.createElement(WorkflowDiagramStepNode, { key: `${step.name}-${index}`, step: step }))))));
};
