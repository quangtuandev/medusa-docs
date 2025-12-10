import React from "react";
import { Badge, Tooltip } from "../..";
export const BetaBadge = ({ text = "Coming soon", tooltipText = "Coming soon", }) => {
    return (React.createElement(Tooltip, { tooltipChildren: tooltipText, className: "align-middle text-compact-x-small-plus" },
        React.createElement(Badge, { variant: "blue", badgeType: "shaded", className: "cursor-pointer" }, text)));
};
