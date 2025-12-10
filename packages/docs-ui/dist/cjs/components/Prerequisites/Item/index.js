"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrerequisiteItem = void 0;
const clsx_1 = __importDefault(require("clsx"));
const link_1 = __importDefault(require("next/link"));
const react_1 = __importDefault(require("react"));
const PrerequisiteItem = ({ item: { text, link, position = "alone" }, }) => {
    return (react_1.default.createElement(link_1.default, { href: link || "#", className: (0, clsx_1.default)("bg-medusa-tag-neutral-bg text-medusa-fg-subtle", "px-docs_0.75 py-docs_0.5 w-fit", "flex justify-center items-center", link && "hover:bg-medusa-tag-neutral-bg-hover", "rounded-tr-docs_xl rounded-br-docs_xl", position === "alone" && "rounded-docs_xl", position === "top" && "rounded-tl-docs_xl rounded-bl-docs_DEFAULT", position === "middle" &&
            "rounded-tl-docs_DEFAULT rounded-bl-docs_DEFAULT", position === "bottom" && "rounded-tl-docs_DEFAULT rounded-bl-docs_xl", !link && "cursor-text"), target: link ? "_blank" : undefined, rel: link ? "noopener noreferrer" : undefined },
        text,
        link && "↗"));
};
exports.PrerequisiteItem = PrerequisiteItem;
