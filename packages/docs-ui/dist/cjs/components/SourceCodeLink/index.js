"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceCodeLink = void 0;
const react_1 = __importDefault(require("react"));
const Link_1 = require("../Link");
const Badge_1 = require("../Badge");
const clsx_1 = __importDefault(require("clsx"));
const Github_1 = require("../Icons/Github");
const SourceCodeLink = ({ link, text, icon, className, }) => {
    return (react_1.default.createElement(Link_1.Link, { href: link, target: "_blank", rel: "noreferrer", className: (0, clsx_1.default)("my-docs_0.5 align-middle inline-block", className) },
        react_1.default.createElement(Badge_1.Badge, { variant: "neutral", className: "inline-flex hover:bg-medusa-tag-neutral-bg-hover cursor-pointer", childrenWrapperClassName: "inline-flex flex-row gap-[3px] items-center" },
            icon || react_1.default.createElement(Github_1.GithubIcon, null),
            react_1.default.createElement("span", null, text || "Source Code"))));
};
exports.SourceCodeLink = SourceCodeLink;
