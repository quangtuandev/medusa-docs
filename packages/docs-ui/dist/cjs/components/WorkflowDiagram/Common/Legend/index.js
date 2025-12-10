"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowDiagramLegend = void 0;
const react_1 = __importDefault(require("react"));
const InlineCode_1 = require("../../../InlineCode");
const ui_1 = require("@medusajs/ui");
const icons_1 = require("@medusajs/icons");
const WorkflowDiagramLegend = ({ hideLegend = false, }) => {
    return (react_1.default.createElement("div", { className: "flex gap-docs_0.5" },
        !hideLegend && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "flex items-center gap-docs_0.5" },
                react_1.default.createElement("div", { className: "flex size-[20px] items-center justify-center text-medusa-tag-orange-icon" },
                    react_1.default.createElement(icons_1.Bolt, null)),
                react_1.default.createElement(ui_1.Text, { size: "xsmall", leading: "compact", weight: "plus", className: "select-none" }, "Workflow hook")),
            react_1.default.createElement("div", { className: "flex items-center gap-docs_0.5" },
                react_1.default.createElement("div", { className: "flex size-[20px] items-center justify-center text-medusa-tag-green-icon" },
                    react_1.default.createElement(icons_1.InformationCircle, null)),
                react_1.default.createElement(ui_1.Text, { size: "xsmall", leading: "compact", weight: "plus", className: "select-none" },
                    "Step conditioned by ",
                    react_1.default.createElement(InlineCode_1.InlineCode, null, "when"))))),
        react_1.default.createElement("div", { className: "flex items-center gap-docs_0.5" },
            react_1.default.createElement("div", { className: "flex size-[20px] items-center justify-center" },
                react_1.default.createElement(icons_1.CursorArrowRays, null)),
            react_1.default.createElement(ui_1.Text, { size: "xsmall", leading: "compact", weight: "plus", className: "select-none" }, "View step details"))));
};
exports.WorkflowDiagramLegend = WorkflowDiagramLegend;
