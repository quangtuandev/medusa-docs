import { WorkflowSteps, WorkflowStepUi } from "types";
export declare const createNodeClusters: (steps: WorkflowSteps) => Record<number, WorkflowStepUi[]>;
export declare const getNextCluster: (clusters: Record<number, WorkflowStepUi[]>, depth: number) => WorkflowStepUi[];
//# sourceMappingURL=workflow-diagram-utils.d.ts.map