"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningPathFinish = void 0;
const docs_ui_1 = require("../../../index.js");
const react_1 = __importDefault(require("react"));
const LearningPathFinish = ({ type, step, onRating, }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        type === "rating" && (react_1.default.createElement(docs_ui_1.Rating, { event: step.eventName, onRating: onRating })),
        type === "custom" && (react_1.default.createElement("span", { className: "text-compact-small text-medusa-fg-subtle" }, step.descriptionJSX))));
};
exports.LearningPathFinish = LearningPathFinish;
