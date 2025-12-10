"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlagNotice = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("../../../components");
const FeatureFlagNotice = ({ featureFlag, type = "endpoint", tooltipTextClassName, badgeClassName, badgeContent = "feature flag", }) => {
    return (react_1.default.createElement(components_1.Tooltip, { tooltipChildren: react_1.default.createElement("span", { className: tooltipTextClassName },
            "To use this ",
            type,
            ", make sure to",
            react_1.default.createElement("br", null),
            "enable its feature flag: ",
            react_1.default.createElement("code", null, featureFlag)), clickable: true },
        react_1.default.createElement(components_1.Badge, { variant: "green", className: badgeClassName }, badgeContent)));
};
exports.FeatureFlagNotice = FeatureFlagNotice;
