import React from "react";
import { Badge, Tooltip } from "../../../components";
export const VersionNotice = ({ version, tooltipTextClassName, badgeClassName, badgeContent = `v${version}`, }) => {
    return (React.createElement(Tooltip, { tooltipChildren: React.createElement("span", { className: tooltipTextClassName },
            "This is available starting from",
            React.createElement("br", null),
            React.createElement("a", { href: `https://github.com/medusajs/medusa/releases/tag/${version}` },
                "Medusa v",
                version)), clickable: true },
        React.createElement(Badge, { variant: "blue", className: badgeClassName }, badgeContent)));
};
