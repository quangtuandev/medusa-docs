"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const react_1 = __importDefault(require("react"));
const warning_1 = require("./Types/warning");
const default_1 = require("./Types/default");
const sucess_1 = require("./Types/sucess");
const error_1 = require("./Types/error");
const checks_1 = require("./Types/checks");
const soon_1 = require("./Types/soon");
const Note = ({ type = "default", ...props }) => {
    switch (type) {
        case "warning":
            return react_1.default.createElement(warning_1.WarningNote, { type: type, ...props });
        case "success":
            return react_1.default.createElement(sucess_1.SuccessNote, { type: type, ...props });
        case "error":
            return react_1.default.createElement(error_1.ErrorNote, { type: type, ...props });
        // TODO remove both once we've removed all notes using them
        case "check":
            return react_1.default.createElement(checks_1.CheckNote, { type: type, ...props });
        case "soon":
            return react_1.default.createElement(soon_1.SoonNote, { type: type, ...props });
        default:
            return react_1.default.createElement(default_1.DefaultNote, { type: type, ...props });
    }
};
exports.Note = Note;
