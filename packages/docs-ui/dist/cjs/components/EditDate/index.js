"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditDate = void 0;
const react_1 = __importDefault(require("react"));
const DATE_REGEX = /^[a-zA-Z]+ (?<month>[a-zA-Z]+)/;
const EditDate = ({ date }) => {
    const today = new Date(date);
    const dateObj = new Date(date);
    const formattedDate = dateObj.toString();
    const dateMatch = DATE_REGEX.exec(formattedDate);
    if (!dateMatch?.groups?.month) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { className: "text-compact-small-plus" },
            "Edited ",
            dateMatch.groups.month,
            " ",
            dateObj.getDate(),
            dateObj.getFullYear() !== today.getFullYear()
                ? `, ${dateObj.getFullYear()}`
                : ""),
        react_1.default.createElement("span", { className: "text-compact-small" }, "\u00B7")));
};
exports.EditDate = EditDate;
