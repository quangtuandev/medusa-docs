"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditButton = void 0;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const EditDate_1 = require("../EditDate");
const EditButton = ({ filePath, editDate }) => {
    return (react_1.default.createElement("div", { className: "flex flex-wrap gap-docs_0.5 mt-docs_2 text-medusa-fg-subtle" },
        editDate && react_1.default.createElement(EditDate_1.EditDate, { date: editDate }),
        react_1.default.createElement(link_1.default, { href: `https://github.com/medusajs/medusa/edit/develop${filePath}`, className: (0, clsx_1.default)("flex w-fit gap-docs_0.25 items-center", "text-medusa-fg-subtle hover:text-medusa-fg-base", "text-compact-small-plus") },
            react_1.default.createElement("span", null, "Edit this page"),
            react_1.default.createElement(icons_1.ArrowUpRightOnBox, null))));
};
exports.EditButton = EditButton;
