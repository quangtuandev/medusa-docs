import React from "react";
type LearningPathStepActionsType = {
    onFinish?: () => void;
    onClose?: () => void;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
} & React.AllHTMLAttributes<HTMLDivElement>;
export declare const LearningPathStepActions: ({ onFinish, onClose, setCollapsed, }: LearningPathStepActionsType) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map