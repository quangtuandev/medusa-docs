import React from "react";
import { LearningPathFinishType } from "../../components/LearningPath/Finish";
export type LearningPathType = {
    name: string;
    label: string;
    description?: string;
    steps: LearningPathStepType[];
    finish?: LearningPathFinishType;
    notificationId?: string;
};
export type LearningPathStepType = {
    title?: string;
    description?: string;
    descriptionJSX?: JSX.Element;
    path?: string;
};
export type LearningPathContextType = {
    path: LearningPathType | null;
    setPath: (value: LearningPathType) => void;
    currentStep: number;
    setCurrentStep: (value: number) => void;
    startPath: (path: LearningPathType) => void;
    updatePath: (data: Pick<LearningPathType, "notificationId">) => void;
    endPath: () => void;
    nextStep: () => void;
    hasNextStep: () => boolean;
    previousStep: () => void;
    hasPreviousStep: () => boolean;
    goToStep: (stepIndex: number) => void;
    isCurrentPath: () => boolean;
    goToCurrentPath: () => void;
    baseUrl?: string;
};
type LearningPathProviderProps = {
    children?: React.ReactNode;
    baseUrl?: string;
};
export declare const LearningPathProvider: React.FC<LearningPathProviderProps>;
export declare const useLearningPath: () => LearningPathContextType;
export {};
//# sourceMappingURL=index.d.ts.map