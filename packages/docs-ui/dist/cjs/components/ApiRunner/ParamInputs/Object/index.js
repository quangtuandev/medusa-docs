"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRunnerParamObjectInput = void 0;
const react_1 = __importDefault(require("react"));
const Default_1 = require("../Default");
const clsx_1 = __importDefault(require("clsx"));
const ApiRunnerParamObjectInput = ({ paramName, paramValue, objPath, ...props }) => {
    if (typeof paramValue !== "object") {
        return (react_1.default.createElement(Default_1.ApiRunnerParamInput, { paramName: paramName, paramValue: paramValue, objPath: objPath, ...props }));
    }
    return (react_1.default.createElement("fieldset", { className: (0, clsx_1.default)("border border-medusa-border-strong rounded", "p-docs_0.5") },
        react_1.default.createElement("legend", { className: "px-docs_0.5" },
            react_1.default.createElement("code", null, paramName),
            " Properties"),
        Object.entries(paramValue).map(([key, value], index) => (react_1.default.createElement(Default_1.ApiRunnerParamInput, { paramName: key, paramValue: value, objPath: `${objPath.length ? `${objPath}.` : ""}${paramName}`, key: index, ...props })))));
};
exports.ApiRunnerParamObjectInput = ApiRunnerParamObjectInput;
