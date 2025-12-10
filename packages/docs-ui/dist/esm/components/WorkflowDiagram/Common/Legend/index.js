import React from "react";
import { InlineCode } from "../../../InlineCode";
import { Text } from "@medusajs/ui";
import { Bolt, CursorArrowRays, InformationCircle } from "@medusajs/icons";
export const WorkflowDiagramLegend = ({ hideLegend = false, }) => {
    return (React.createElement("div", { className: "flex gap-docs_0.5" },
        !hideLegend && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "flex items-center gap-docs_0.5" },
                React.createElement("div", { className: "flex size-[20px] items-center justify-center text-medusa-tag-orange-icon" },
                    React.createElement(Bolt, null)),
                React.createElement(Text, { size: "xsmall", leading: "compact", weight: "plus", className: "select-none" }, "Workflow hook")),
            React.createElement("div", { className: "flex items-center gap-docs_0.5" },
                React.createElement("div", { className: "flex size-[20px] items-center justify-center text-medusa-tag-green-icon" },
                    React.createElement(InformationCircle, null)),
                React.createElement(Text, { size: "xsmall", leading: "compact", weight: "plus", className: "select-none" },
                    "Step conditioned by ",
                    React.createElement(InlineCode, null, "when"))))),
        React.createElement("div", { className: "flex items-center gap-docs_0.5" },
            React.createElement("div", { className: "flex size-[20px] items-center justify-center" },
                React.createElement(CursorArrowRays, null)),
            React.createElement(Text, { size: "xsmall", leading: "compact", weight: "plus", className: "select-none" }, "View step details"))));
};
