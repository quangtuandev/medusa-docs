"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardLayoutMini = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const __1 = require("../../../..");
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const icons_1 = require("@medusajs/icons");
const CardLayoutMini = ({ icon, image, themeImage, title, text, href, hrefProps = {}, closeable = false, onClose, className, imageDimensions = { width: 45, height: 36 }, iconClassName, cardRef, }) => {
    const isExternal = (0, __1.useIsExternalLink)({ href });
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("relative rounded-docs_DEFAULT border-medusa-fg-on-inverted border", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "hover:shadow-elevation-card-hover dark:hover:shadow-elevation-card-hover-dark", "bg-medusa-tag-neutral-bg dark:bg-medusa-bg-component", "hover:bg-medusa-tag-neutral-bg-hover dark:hover:bg-medusa-bg-component-hover", "w-fit transition-[shadow,background]", className), ref: cardRef },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("rounded-docs_DEFAULT flex gap-docs_0.75 py-docs_0.25", "pl-docs_0.25 pr-docs_0.75 items-center") },
            icon && (react_1.default.createElement(__1.BorderedIcon, { wrapperClassName: (0, clsx_1.default)("p-[4.5px] bg-medusa-bg-component-hover"), IconComponent: icon })),
            image && (react_1.default.createElement(image_1.default, { src: image, className: (0, clsx_1.default)("shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "rounded-docs_xs", iconClassName), width: imageDimensions.width, height: imageDimensions.height, alt: title || text || "", style: {
                    width: `${imageDimensions.width}px`,
                    height: `${imageDimensions.height}px`,
                } })),
            themeImage && (react_1.default.createElement(__1.ThemeImage, { ...themeImage, className: (0, clsx_1.default)("shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "rounded-docs_xs", iconClassName), width: imageDimensions.width, height: imageDimensions.height, alt: title || text || "", style: {
                    width: `${imageDimensions.width}px`,
                    height: `${imageDimensions.height}px`,
                } })),
            react_1.default.createElement("div", { className: "flex flex-col" },
                title && (react_1.default.createElement("span", { className: "text-x-small-plus text-medusa-fg-base" }, title)),
                text && (react_1.default.createElement("span", { className: "text-x-small-plus text-medusa-fg-subtle" }, text))),
            !closeable && (react_1.default.createElement("span", { className: "text-medusa-fg-subtle" }, isExternal ? react_1.default.createElement(icons_1.ArrowUpRightOnBox, null) : react_1.default.createElement(icons_1.TriangleRightMini, null))),
            href && (react_1.default.createElement(link_1.default, { href: href, className: "absolute left-0 top-0 w-full h-full z-[1]", prefetch: false, ...hrefProps })),
            closeable && (react_1.default.createElement(__1.Button, { variant: "transparent-clear", onClick: onClose, className: "!p-[2.5px] z-[2] hover:!bg-medusa-button-transparent-hover focus:!shadow-none focus:!bg-transparent" },
                react_1.default.createElement(icons_1.XMark, null))))));
};
exports.CardLayoutMini = CardLayoutMini;
