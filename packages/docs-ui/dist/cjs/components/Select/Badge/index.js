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
exports.SelectBadge = void 0;
const react_1 = __importStar(require("react"));
const hooks_1 = require("../../../hooks");
const clsx_1 = __importDefault(require("clsx"));
const __1 = require("..");
const icons_1 = require("@medusajs/icons");
const SelectBadge = ({ value, options, setSelected, addSelected, removeSelected, multiple, className, addAll = multiple, handleAddAll, ...props }) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    const dropdownRef = (0, react_1.useRef)(null);
    const { isValueSelected, isAllSelected, handleChange, handleSelectAll, setSelectedValues, } = (0, hooks_1.useSelect)({
        value,
        options,
        multiple,
        setSelected,
        removeSelected,
        addSelected,
        handleAddAll,
    });
    const getSelectedText = (0, react_1.useCallback)(() => {
        let str = "";
        const selectedOptions = options.filter((option) => value.includes(option.value));
        if (isAllSelected) {
            str = "All areas";
        }
        else {
            if ((!Array.isArray(value) && !value) ||
                (Array.isArray(value) && !value.length)) {
                str = "No Filters Selected";
            }
            else {
                str = selectedOptions[0].label;
            }
        }
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { className: (0, clsx_1.default)("text-compact-x-small-plus text-medusa-tag-neutral-text") },
                str,
                !isAllSelected && selectedOptions.length > 1 && (react_1.default.createElement(react_1.default.Fragment, null,
                    " + ",
                    selectedOptions.length - 1)))));
    }, [isAllSelected, options, value]);
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("relative w-fit", className) },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("border-medusa-tag-neutral-border rounded-docs_sm border border-solid", "h-fit cursor-pointer pl-docs_0.25 pr-[3px] text-medusa-tag-neutral-text", "bg-medusa-tag-neutral-bg", "flex items-center gap-[3px] whitespace-nowrap", "text-medusa-fg-subtle", open && "bg-medusa-tag-neutral-bg-hover"), ref: ref, onClick: (e) => {
                if (!dropdownRef.current?.contains(e.target)) {
                    setOpen((prev) => !prev);
                }
            } },
            getSelectedText(),
            react_1.default.createElement(icons_1.TriangleDownMini, { className: "text-medusa-tag-neutral-icon" })),
        react_1.default.createElement("input", { type: "hidden", name: props.name, value: Array.isArray(value) ? value.join(",") : value }),
        react_1.default.createElement(__1.SelectDropdown, { options: options, open: open, setOpen: setOpen, addAll: addAll, multiple: multiple, isAllSelected: isAllSelected, isValueSelected: isValueSelected, handleSelectAll: handleSelectAll, handleChange: handleChange, parentRef: ref, passedRef: dropdownRef, setSelectedValues: setSelectedValues })));
};
exports.SelectBadge = SelectBadge;
exports.default = exports.SelectBadge;
