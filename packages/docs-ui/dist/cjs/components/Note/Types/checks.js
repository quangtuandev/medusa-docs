"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckNote = void 0;
const react_1 = __importDefault(require("react"));
const Layout_1 = require("../Layout");
const CheckNote = ({ title = "Prerequisites", ...props }) => {
    return react_1.default.createElement(Layout_1.NoteLayout, { title: title, ...props });
};
exports.CheckNote = CheckNote;
