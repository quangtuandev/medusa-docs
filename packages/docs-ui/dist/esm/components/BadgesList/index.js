import React from "react";
import { Badge } from "../Badge";
import clsx from "clsx";
export const BadgesList = ({ badges, className }) => {
    return (React.createElement("div", { className: clsx("flex flex-wrap gap-docs_0.5", className) }, badges.map((badgeProps, index) => (React.createElement(Badge, { ...badgeProps, key: index })))));
};
