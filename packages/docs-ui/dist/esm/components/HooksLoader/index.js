"use client";
import React from "react";
import { useCurrentLearningPath, usePageScrollManager } from "../../hooks";
export const HooksLoader = ({ children, options = {} }) => {
    const { pageScrollManager, currentLearningPath } = options;
    // load any hooks that require providers to be loaded here.
    if (pageScrollManager) {
        usePageScrollManager();
    }
    if (currentLearningPath) {
        useCurrentLearningPath();
    }
    return React.createElement(React.Fragment, null, children);
};
