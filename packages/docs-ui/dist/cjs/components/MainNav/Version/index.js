"use strict";
"use state";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainNavVersion = void 0;
const react_1 = __importDefault(require("react"));
const providers_1 = require("../../../providers");
const link_1 = __importDefault(require("next/link"));
const Tooltip_1 = require("../../Tooltip");
const clsx_1 = __importDefault(require("clsx"));
const MainNavVersion = () => {
    const { config: { version }, } = (0, providers_1.useSiteConfig)();
    return (react_1.default.createElement(link_1.default, { href: version.releaseUrl, target: "_blank", className: (0, clsx_1.default)(version.hide && "hidden", "px-docs_0.5 py-docs_0.25 hover:bg-medusa-button-transparent-hover rounded-docs_sm") },
        react_1.default.createElement(Tooltip_1.Tooltip, { html: "View the release notes<br/>on GitHub" },
            react_1.default.createElement("span", { className: "relative text-compact-small-plus block" },
                react_1.default.createElement("span", { className: "flex justify-center items-center" },
                    "v",
                    version.number)))));
};
exports.MainNavVersion = MainNavVersion;
