import { Rating } from "../../../index.js";
import React from "react";
export const LearningPathFinish = ({ type, step, onRating, }) => {
    return (React.createElement(React.Fragment, null,
        type === "rating" && (React.createElement(Rating, { event: step.eventName, onRating: onRating })),
        type === "custom" && (React.createElement("span", { className: "text-compact-small text-medusa-fg-subtle" }, step.descriptionJSX))));
};
