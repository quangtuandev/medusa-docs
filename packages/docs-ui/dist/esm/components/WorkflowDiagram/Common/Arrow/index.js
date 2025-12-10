import React from "react";
import { WorkflowDiagramArrowHorizontal } from "./Horizontal";
import { WorkflowDiagramArrowEnd } from "./End";
import { WorkflowDiagramArrowMiddle } from "./Middle";
export const WorkflowDiagramArrow = ({ depth }) => {
    if (depth === 1) {
        return React.createElement(WorkflowDiagramArrowHorizontal, null);
    }
    if (depth === 2) {
        return (React.createElement("div", { className: "flex flex-col items-end" },
            React.createElement(WorkflowDiagramArrowHorizontal, null),
            React.createElement(WorkflowDiagramArrowEnd, null)));
    }
    const inbetween = Array.from({ length: depth - 2 }).map((_, index) => (React.createElement(WorkflowDiagramArrowMiddle, { key: index })));
    return (React.createElement("div", { className: "flex flex-col items-end" },
        React.createElement(WorkflowDiagramArrowHorizontal, null),
        inbetween,
        React.createElement(WorkflowDiagramArrowEnd, null)));
};
