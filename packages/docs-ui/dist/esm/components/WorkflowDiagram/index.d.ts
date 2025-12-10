import React from "react";
import { Workflow } from "types";
export type WorkflowDiagramCommonOptionsProps = {
    hideLegend?: boolean;
};
export type WorkflowDiagramCommonProps = {
    workflow: Workflow;
} & WorkflowDiagramCommonOptionsProps;
export type WorkflowDiagramType = "canvas" | "list";
export type WorkflowDiagramProps = WorkflowDiagramCommonProps & {
    type?: WorkflowDiagramType;
};
export declare const WorkflowDiagram: ({ type, ...props }: WorkflowDiagramProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map