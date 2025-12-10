"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionNotice = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("../../../components");
const VersionNotice = ({ version, tooltipTextClassName, badgeClassName, badgeContent = `v${version}`, }) => {
    return (react_1.default.createElement(components_1.Tooltip, { tooltipChildren: react_1.default.createElement("span", { className: tooltipTextClassName },
            "This is available starting from",
            react_1.default.createElement("br", null),
            react_1.default.createElement("a", { href: `https://github.com/medusajs/medusa/releases/tag/${version}` },
                "Medusa v",
                version)), clickable: true },
        react_1.default.createElement(components_1.Badge, { variant: "blue", className: badgeClassName }, badgeContent)));
};
exports.VersionNotice = VersionNotice;
