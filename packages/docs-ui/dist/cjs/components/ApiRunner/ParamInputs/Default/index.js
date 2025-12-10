"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRunnerParamInput = void 0;
const react_1 = __importDefault(require("react"));
const __1 = require("../../../..");
const set_obj_value_1 = __importDefault(require("../../../../utils/set-obj-value"));
const Object_1 = require("../Object");
const Array_1 = require("../Array");
const ApiRunnerParamInput = ({ paramName, paramValue, objPath, setValue, }) => {
    if (Array.isArray(paramValue)) {
        return (react_1.default.createElement(Array_1.ApiRunnerParamArrayInput, { paramName: paramName, paramValue: paramValue, objPath: objPath, setValue: setValue }));
    }
    if (typeof paramValue === "object") {
        return (react_1.default.createElement(Object_1.ApiRunnerParamObjectInput, { paramName: paramName, paramValue: paramValue, objPath: objPath, setValue: setValue }));
    }
    return (react_1.default.createElement(__1.InputText, { name: paramName, onChange: (e) => {
            setValue((prev) => {
                if (Array.isArray(prev)) {
                    // try to get index from param name
                    const splitPath = objPath.split(".");
                    // if param is in an object in the array, the index is
                    // the last item of the `objPath`. Otherwise, it's in the param name
                    const index = (objPath.length > 0 ? splitPath[splitPath.length - 1] : paramName)
                        .replace("[", "")
                        .replace("]", "");
                    const intIndex = parseInt(index);
                    // if we can't get the index from the param name or obj path
                    // just insert the value to the end of the array.
                    if (Number.isNaN(intIndex)) {
                        return [...prev, e.target.value];
                    }
                    // if the param is within an object, the value to be set
                    // is the updated value of the object. Otherwise, it's just the
                    // value of the item.
                    const transformedValue = prev.length > 0 && typeof prev[0] === "object"
                        ? (0, set_obj_value_1.default)({
                            obj: { ...prev[intIndex] },
                            value: e.target.value,
                            path: paramName,
                        })
                        : e.target.value;
                    return [
                        ...prev.slice(0, intIndex),
                        transformedValue,
                        ...prev.slice(intIndex + 1),
                    ];
                }
                return typeof prev === "object"
                    ? (0, set_obj_value_1.default)({
                        obj: { ...prev },
                        value: e.target.value,
                        path: `${objPath.length ? `${objPath}.` : ""}${paramName}`,
                    })
                    : e.target.value;
            });
        }, placeholder: paramName, value: typeof paramValue === "string"
            ? paramValue
            : typeof paramValue === "number"
                ? paramValue
                : `${paramValue}`, className: "w-full" }));
};
exports.ApiRunnerParamInput = ApiRunnerParamInput;
