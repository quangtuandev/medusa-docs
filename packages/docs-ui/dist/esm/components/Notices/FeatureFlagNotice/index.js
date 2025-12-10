import React from "react";
import { Badge, Tooltip } from "../../../components";
export const FeatureFlagNotice = ({ featureFlag, type = "endpoint", tooltipTextClassName, badgeClassName, badgeContent = "feature flag", }) => {
    return (React.createElement(Tooltip, { tooltipChildren: React.createElement("span", { className: tooltipTextClassName },
            "To use this ",
            type,
            ", make sure to",
            React.createElement("br", null),
            "enable its feature flag: ",
            React.createElement("code", null, featureFlag)), clickable: true },
        React.createElement(Badge, { variant: "green", className: badgeClassName }, badgeContent)));
};
