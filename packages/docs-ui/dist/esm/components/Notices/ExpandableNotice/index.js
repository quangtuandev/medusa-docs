import React from "react";
import { Badge, Link, Tooltip } from "../../../components";
export const ExpandableNotice = ({ type = "request", link, badgeContent = "expandable", badgeClassName, }) => {
    return (React.createElement(Tooltip, { tooltipChildren: React.createElement(React.Fragment, null,
            "If this ",
            type,
            " accepts an ",
            React.createElement("code", null, "expand"),
            " ",
            type === "request" ? "parameter" : "parameter or property",
            ",",
            React.createElement("br", null),
            " this relation can be ",
            React.createElement(Link, { href: link }, "expanded"),
            " into an object."), clickable: true },
        React.createElement(Badge, { variant: "blue", className: badgeClassName }, badgeContent)));
};
