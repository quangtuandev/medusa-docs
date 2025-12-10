"use client";
import React from "react";
import { createNodeClusters, getNextCluster } from "../../../utils";
import { WorkflowDiagramListDepth } from "./Depth";
import { WorkflowDiagramLegend } from "../Common/Legend";
export const WorkflowDiagramList = ({ workflow, hideLegend = false, }) => {
    const clusters = createNodeClusters(workflow.steps);
    return (React.createElement("div", { className: "flex flex-col gap-docs_1 my-docs_1 w-fit" },
        React.createElement("div", { className: "workflow-list-diagram flex flex-col gap-docs_0.5 w-fit" }, Object.entries(clusters).map(([depth, cluster]) => {
            const next = getNextCluster(clusters, Number(depth));
            return (React.createElement(WorkflowDiagramListDepth, { cluster: cluster, next: next, key: depth }));
        })),
        React.createElement(WorkflowDiagramLegend, { hideLegend: hideLegend })));
};
