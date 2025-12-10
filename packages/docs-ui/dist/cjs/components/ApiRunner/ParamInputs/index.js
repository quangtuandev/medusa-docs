"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRunnerParamInputs = void 0;
const react_1 = __importDefault(require("react"));
const Default_1 = require("./Default");
const ApiRunnerParamInputs = ({ data, title, baseObjPath, setValue, }) => {
    return (react_1.default.createElement("div", { className: "flex flex-col gap-docs_0.25 w-full" },
        react_1.default.createElement("span", { className: "txt-small-plus text-medusa-fg-base" }, title),
        react_1.default.createElement("div", { className: "flex flex-col gap-docs_0.5" }, Object.keys(data).map((pathParam, index) => (react_1.default.createElement(Default_1.ApiRunnerParamInput, { paramName: pathParam, paramValue: data[pathParam], objPath: baseObjPath, setValue: setValue, key: index }))))));
};
exports.ApiRunnerParamInputs = ApiRunnerParamInputs;
