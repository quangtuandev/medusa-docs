"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardDefaultLayout = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../../../components");
const icons_1 = require("@medusajs/icons");
const __1 = require("../../../..");
const CardDefaultLayout = ({ icon, image, title, text, href, className, contentClassName, iconClassName, children, badge, rightIcon: RightIconComponent, highlightText = [], }) => {
    const isExternal = (0, __1.useIsExternalLink)({ href });
    const getHighlightedText = (textToHighlight) => {
        if (!highlightText.length) {
            return textToHighlight;
        }
        const parts = textToHighlight.split(new RegExp(`(${highlightText.join("|")})`, "gi"));
        return parts.map((part, index) => {
            const isHighlighted = highlightText.some((highlight) => {
                return part.toLowerCase() === highlight.toLowerCase();
            });
            return isHighlighted ? (react_1.default.createElement("span", { key: index, className: "bg-medusa-tag-blue-bg px-px rounded-s-docs_xxs" }, part)) : (part);
        });
    };
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("bg-medusa-bg-component w-full rounded-docs_DEFAULT", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "py-docs_0.5 px-docs_0.75 relative", "flex justify-start items-center gap-docs_0.75 transition-shadow", href &&
            "hover:shadow-elevation-card-hover dark:hover:shadow-elevation-card-hover-dark", className) },
        icon && (react_1.default.createElement(components_1.BorderedIcon, { wrapperClassName: (0, clsx_1.default)("p-[4.5px] bg-medusa-bg-component-hover", iconClassName), IconComponent: icon })),
        image && (react_1.default.createElement(components_1.BorderedIcon, { wrapperClassName: (0, clsx_1.default)("bg-medusa-bg-base", iconClassName), icon: image })),
        react_1.default.createElement("div", { className: (0, clsx_1.default)("flex flex-col flex-1 overflow-auto", contentClassName) },
            title && (react_1.default.createElement("div", { className: "text-small-plus text-medusa-fg-base truncate" }, getHighlightedText(title))),
            text && (react_1.default.createElement("span", { className: "text-small-plus text-medusa-fg-subtle" }, getHighlightedText(text))),
            children),
        badge && react_1.default.createElement(components_1.Badge, { ...badge }),
        react_1.default.createElement("span", { className: "text-medusa-fg-subtle" },
            RightIconComponent && react_1.default.createElement(RightIconComponent, null),
            !RightIconComponent && isExternal && react_1.default.createElement(icons_1.ArrowUpRightOnBox, null),
            !RightIconComponent && !isExternal && react_1.default.createElement(icons_1.TriangleRightMini, null)),
        href && (react_1.default.createElement(components_1.Link, { href: href, className: "absolute left-0 top-0 h-full w-full rounded", prefetch: false }))));
};
exports.CardDefaultLayout = CardDefaultLayout;
