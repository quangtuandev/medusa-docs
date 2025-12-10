"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetaBadge = void 0;
const react_1 = __importDefault(require("react"));
const __1 = require("../..");
const BetaBadge = ({ text = "Coming soon", tooltipText = "Coming soon", }) => {
    return (react_1.default.createElement(__1.Tooltip, { tooltipChildren: tooltipText, className: "align-middle text-compact-x-small-plus" },
        react_1.default.createElement(__1.Badge, { variant: "blue", badgeType: "shaded", className: "cursor-pointer" }, text)));
};
exports.BetaBadge = BetaBadge;
