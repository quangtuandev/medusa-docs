import React from "react";
import { useLearningPath } from "../../../../providers/LearningPath";
import { Button } from "../../../../index.js";
import { ArrowDownLeftMini, ArrowDownMini } from "@medusajs/icons";
export const LearningPathStepActions = ({ onFinish, onClose, setCollapsed, }) => {
    const { hasNextStep, nextStep, endPath } = useLearningPath();
    const handleFinish = () => {
        if (onFinish) {
            onFinish();
        }
        else {
            endPath();
        }
    };
    return (React.createElement("div", { className: "flex p-docs_1 justify-between items-center" },
        React.createElement("div", null,
            React.createElement(Button, { onClick: () => setCollapsed(true), variant: "secondary", className: "!text-medusa-fg-subtle !p-[6px]" },
                React.createElement(ArrowDownLeftMini, { className: "flip-y hidden md:inline" }),
                React.createElement(ArrowDownMini, { className: "inline md:hidden" }))),
        React.createElement("div", { className: "flex gap-docs_0.5 items-center" },
            hasNextStep() && (React.createElement(React.Fragment, null,
                React.createElement(Button, { onClick: onClose, variant: "secondary" }, "Close"),
                React.createElement(Button, { onClick: nextStep, variant: "primary" }, "Next"))),
            !hasNextStep() && (React.createElement(Button, { onClick: handleFinish, variant: "primary" }, "Finish")))));
};
