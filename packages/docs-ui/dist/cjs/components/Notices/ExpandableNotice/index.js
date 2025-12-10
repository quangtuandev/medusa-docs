"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandableNotice = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("../../../components");
const ExpandableNotice = ({ type = "request", link, badgeContent = "expandable", badgeClassName, }) => {
    return (react_1.default.createElement(components_1.Tooltip, { tooltipChildren: react_1.default.createElement(react_1.default.Fragment, null,
            "If this ",
            type,
            " accepts an ",
            react_1.default.createElement("code", null, "expand"),
            " ",
            type === "request" ? "parameter" : "parameter or property",
            ",",
            react_1.default.createElement("br", null),
            " this relation can be ",
            react_1.default.createElement(components_1.Link, { href: link }, "expanded"),
            " into an object."), clickable: true },
        react_1.default.createElement(components_1.Badge, { variant: "blue", className: badgeClassName }, badgeContent)));
};
exports.ExpandableNotice = ExpandableNotice;
