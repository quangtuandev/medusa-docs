import React from "react";
import { WorkflowDiagramArrow } from "../Arrow";
export const WorkflowDiagramLine = ({ step }) => {
    if (!step) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement("div", { className: "ml-0 -mr-[7px] w-[60px] pr-[7px]" },
        React.createElement("div", { className: "flex min-h-[24px] w-full items-start" },
            React.createElement("div", { className: "flex h-docs_1.5 w-[10px] items-center justify-center" },
                React.createElement("div", { className: "bg-medusa-button-neutral shadow-borders-base size-[10px] shrink-0 rounded-full" })),
            React.createElement("div", { className: "pt-[6px]" },
                React.createElement(WorkflowDiagramArrow, { depth: step.length })))));
};
