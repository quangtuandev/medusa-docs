"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningPathStepActions = void 0;
const react_1 = __importDefault(require("react"));
const LearningPath_1 = require("../../../../providers/LearningPath");
const docs_ui_1 = require("../../../../index.js");
const icons_1 = require("@medusajs/icons");
const LearningPathStepActions = ({ onFinish, onClose, setCollapsed, }) => {
    const { hasNextStep, nextStep, endPath } = (0, LearningPath_1.useLearningPath)();
    const handleFinish = () => {
        if (onFinish) {
            onFinish();
        }
        else {
            endPath();
        }
    };
    return (react_1.default.createElement("div", { className: "flex p-docs_1 justify-between items-center" },
        react_1.default.createElement("div", null,
            react_1.default.createElement(docs_ui_1.Button, { onClick: () => setCollapsed(true), variant: "secondary", className: "!text-medusa-fg-subtle !p-[6px]" },
                react_1.default.createElement(icons_1.ArrowDownLeftMini, { className: "flip-y hidden md:inline" }),
                react_1.default.createElement(icons_1.ArrowDownMini, { className: "inline md:hidden" }))),
        react_1.default.createElement("div", { className: "flex gap-docs_0.5 items-center" },
            hasNextStep() && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(docs_ui_1.Button, { onClick: onClose, variant: "secondary" }, "Close"),
                react_1.default.createElement(docs_ui_1.Button, { onClick: nextStep, variant: "primary" }, "Next"))),
            !hasNextStep() && (react_1.default.createElement(docs_ui_1.Button, { onClick: handleFinish, variant: "primary" }, "Finish")))));
};
exports.LearningPathStepActions = LearningPathStepActions;
