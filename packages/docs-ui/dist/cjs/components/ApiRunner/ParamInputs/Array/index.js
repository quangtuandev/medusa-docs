"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRunnerParamArrayInput = void 0;
const react_1 = __importStar(require("react"));
const Default_1 = require("../Default");
const clsx_1 = __importDefault(require("clsx"));
const set_obj_value_1 = __importDefault(require("../../../../utils/set-obj-value"));
const __1 = require("../../../..");
const icons_1 = require("@medusajs/icons");
const ApiRunnerParamArrayInput = ({ paramName, paramValue, objPath, setValue, }) => {
    const [itemsValue, setItemsValue] = (0, react_1.useState)(paramValue);
    (0, react_1.useEffect)(() => {
        setValue((prev) => {
            return typeof prev === "object"
                ? (0, set_obj_value_1.default)({
                    obj: { ...prev },
                    value: itemsValue,
                    path: `${objPath.length ? `${objPath}.` : ""}${paramName}`,
                })
                : itemsValue;
        });
    }, [itemsValue]);
    if (!Array.isArray(paramValue)) {
        return (react_1.default.createElement(Default_1.ApiRunnerParamInput, { paramName: paramName, paramValue: paramValue, objPath: objPath, setValue: setValue }));
    }
    return (react_1.default.createElement("fieldset", { className: (0, clsx_1.default)("border border-medusa-border-strong rounded", "p-docs_0.5") },
        react_1.default.createElement("legend", { className: "px-docs_0.5" },
            react_1.default.createElement("code", null, paramName),
            " Array Items"),
        itemsValue.map((value, index) => (react_1.default.createElement("div", { key: index, className: (0, clsx_1.default)(index > 0 &&
                "flex gap-docs_0.5 items-center justify-center mt-docs_0.5") },
            react_1.default.createElement(Default_1.ApiRunnerParamInput, { paramName: `[${index}]`, paramValue: value, objPath: "", setValue: setItemsValue }),
            index > 0 && (react_1.default.createElement(__1.Button, { buttonType: "icon", variant: "secondary", onClick: () => {
                    setItemsValue((prev) => prev.splice(index, 1));
                }, className: "mt-0.5" },
                react_1.default.createElement(icons_1.Minus, null)))))),
        react_1.default.createElement(__1.Button, { buttonType: "icon", variant: "secondary", onClick: () => {
                setItemsValue((prev) => [
                    ...prev,
                    Array.isArray(prev[0])
                        ? [...prev[0]]
                        : typeof prev[0] === "object"
                            ? Object.assign({}, prev[0])
                            : prev[0],
                ]);
            }, className: "mt-0.5" },
            react_1.default.createElement(icons_1.Plus, null))));
};
exports.ApiRunnerParamArrayInput = ApiRunnerParamArrayInput;
