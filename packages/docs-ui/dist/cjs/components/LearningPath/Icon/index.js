"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningPathIcon = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const __1 = require("../../..");
const LearningPathIcon = ({ className = "", imgClassName = "", }) => {
    const { baseUrl } = (0, __1.useLearningPath)();
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("rounded-full shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark w-docs_3 h-docs_3 bg-medusa-bg-base", "flex justify-center items-center flex-none", className) },
        react_1.default.createElement("img", { src: `${baseUrl}/images/learning-path-img.png`, className: (0, clsx_1.default)("rounded-full w-docs_2.5 h-docs_2.5", imgClassName) })));
};
exports.LearningPathIcon = LearningPathIcon;
