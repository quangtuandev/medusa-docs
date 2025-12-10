"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorderedIcon = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const image_1 = __importDefault(require("next/image"));
const BorderedIcon = ({ icon = "", IconComponent = null, iconWrapperClassName, iconClassName, iconColorClassName = "", wrapperClassName, iconWidth = 28, iconHeight = 28, }) => {
    return (react_1.default.createElement("span", { className: (0, clsx_1.default)("rounded-docs_sm p-docs_0.125 bg-medusa-bg-base inline-flex items-center justify-center", "shadow-border-base dark:shadow-border-base-dark", iconWrapperClassName) },
        react_1.default.createElement("span", { className: (0, clsx_1.default)("rounded-docs_xs", wrapperClassName) },
            !IconComponent && (react_1.default.createElement(image_1.default, { src: icon || "", className: (0, clsx_1.default)(iconClassName, "bordered-icon rounded-docs_xs"), width: iconWidth, height: iconHeight, alt: "" })),
            IconComponent && (react_1.default.createElement(IconComponent, { className: (0, clsx_1.default)("text-medusa-fg-subtle rounded-docs_xs", iconClassName, "bordered-icon", iconColorClassName) })))));
};
exports.BorderedIcon = BorderedIcon;
