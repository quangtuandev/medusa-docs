"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgesList = void 0;
const react_1 = __importDefault(require("react"));
const Badge_1 = require("../Badge");
const clsx_1 = __importDefault(require("clsx"));
const BadgesList = ({ badges, className }) => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex flex-wrap gap-docs_0.5", className) }, badges.map((badgeProps, index) => (react_1.default.createElement(Badge_1.Badge, { ...badgeProps, key: index })))));
};
exports.BadgesList = BadgesList;
