"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeprecatedNotice = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("../../../components");
const DeprecatedNotice = ({ description, tooltipTextClassName, badgeClassName, badgeContent = `Deprecated`, }) => {
    return (react_1.default.createElement(components_1.Tooltip, { tooltipChildren: react_1.default.createElement("span", { className: tooltipTextClassName }, description ||
            "This feature is deprecated and may be removed in future releases."), clickable: true },
        react_1.default.createElement(components_1.Badge, { variant: "neutral", className: badgeClassName }, badgeContent)));
};
exports.DeprecatedNotice = DeprecatedNotice;
