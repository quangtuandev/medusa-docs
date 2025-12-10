"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildDocs = void 0;
const react_1 = __importDefault(require("react"));
const __1 = require("../..");
const ChildDocs = (props) => {
    const { component } = (0, __1.useChildDocs)(props);
    return react_1.default.createElement(react_1.default.Fragment, null, component);
};
exports.ChildDocs = ChildDocs;
