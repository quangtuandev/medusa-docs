import { LearningPathStepType } from "../../../providers";
import React from "react";
export type LearningPathFinishType = {
    type: "rating";
    step: Omit<LearningPathStepType, "descriptionJSX"> & {
        eventName?: string;
    };
} | {
    type: "custom";
    step: LearningPathStepType & {
        descriptionJSX: JSX.Element;
    };
};
type LearningPathFinishProps = LearningPathFinishType & {
    onRating?: () => void;
};
export declare const LearningPathFinish: ({ type, step, onRating, }: LearningPathFinishProps) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map