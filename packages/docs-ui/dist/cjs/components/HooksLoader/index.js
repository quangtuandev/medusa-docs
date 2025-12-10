"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HooksLoader = void 0;
const react_1 = __importDefault(require("react"));
const hooks_1 = require("../../hooks");
const HooksLoader = ({ children, options = {} }) => {
    const { pageScrollManager, currentLearningPath } = options;
    // load any hooks that require providers to be loaded here.
    if (pageScrollManager) {
        (0, hooks_1.usePageScrollManager)();
    }
    if (currentLearningPath) {
        (0, hooks_1.useCurrentLearningPath)();
    }
    return react_1.default.createElement(react_1.default.Fragment, null, children);
};
exports.HooksLoader = HooksLoader;
