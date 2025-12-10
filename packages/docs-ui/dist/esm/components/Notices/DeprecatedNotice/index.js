import React from "react";
import { Badge, Tooltip } from "../../../components";
export const DeprecatedNotice = ({ description, tooltipTextClassName, badgeClassName, badgeContent = `Deprecated`, }) => {
    return (React.createElement(Tooltip, { tooltipChildren: React.createElement("span", { className: tooltipTextClassName }, description ||
            "This feature is deprecated and may be removed in future releases."), clickable: true },
        React.createElement(Badge, { variant: "neutral", className: badgeClassName }, badgeContent)));
};
