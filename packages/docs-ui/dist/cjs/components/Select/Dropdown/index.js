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
exports.SelectDropdown = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const SelectDropdown = ({ open, setOpen, options, addAll, multiple = false, isAllSelected, isValueSelected, handleSelectAll, handleChange: handleSelectChange, parentRef, className, passedRef, setSelectedValues, }) => {
    const ref = (0, react_1.useRef)(null);
    const setRefs = (0, react_1.useCallback)((node) => {
        // Ref's from useRef needs to have the node assigned to `current`
        ref.current = node;
        if (typeof passedRef === "function") {
            passedRef(node);
        }
        else if (passedRef && "current" in passedRef) {
            passedRef.current = node;
        }
    }, [passedRef]);
    const handleChange = (clickedValue, wasSelected) => {
        if (isAllSelected && setSelectedValues) {
            setSelectedValues([clickedValue]);
        }
        else {
            handleSelectChange?.(clickedValue, wasSelected);
        }
        if (!multiple) {
            setOpen(false);
        }
    };
    const handleOutsideClick = (0, react_1.useCallback)((e) => {
        if (open &&
            !ref.current?.contains(e.target) &&
            !parentRef?.current?.contains(e.target)) {
            setOpen(false);
        }
    }, [open, parentRef, setOpen]);
    (0, react_1.useEffect)(() => {
        document.body.addEventListener("click", handleOutsideClick);
        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
        };
    }, [handleOutsideClick]);
    const getSelectOption = (option, index) => {
        const originalIsSelected = isValueSelected(option.value);
        const isSelected = isAllSelected
            ? option.isAllOption || false
            : originalIsSelected;
        return (react_1.default.createElement("li", { key: index, className: (0, clsx_1.default)("px-docs_0.25", index <= 0 && "rounded-t-docs_DEFAULT", index === options.length - 1 && "rounded-b-docs_DEFAULT"), onClick: () => {
                if (option.isAllOption) {
                    handleSelectAll();
                }
                else {
                    handleChange(option.value, originalIsSelected);
                }
            } },
            react_1.default.createElement("div", { className: (0, clsx_1.default)("px-docs_0.5 py-docs_0.25 flex-1 min-w-max rounded-docs_xs", "hover:bg-medusa-bg-component-hover cursor-pointer", "flex gap-docs_0.5 text-medusa-fg-base items-center", !isSelected && "text-compact-small", isSelected && "text-compact-small-plus") },
                react_1.default.createElement("span", null,
                    isSelected && (react_1.default.createElement(react_1.default.Fragment, null,
                        option.isAllOption && react_1.default.createElement(icons_1.EllipseMiniSolid, null),
                        !option.isAllOption && (react_1.default.createElement(react_1.default.Fragment, null,
                            multiple && react_1.default.createElement(icons_1.CheckMini, null),
                            !multiple && react_1.default.createElement(icons_1.EllipseMiniSolid, null))))),
                    !isSelected && react_1.default.createElement(icons_1.EllipseMiniSolid, { className: "invisible" })),
                react_1.default.createElement("span", { className: "flex-1" }, option.label))));
    };
    const getDivider = () => (react_1.default.createElement("svg", { width: "176", height: "8", viewBox: "0 0 176 8", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        react_1.default.createElement("rect", { width: "168", height: "8", transform: "translate(4)", fill: "#FAFAFA" }),
        react_1.default.createElement("rect", { y: "4", width: "176", height: "1", fill: "white" }),
        react_1.default.createElement("rect", { y: "3", width: "176", height: "1", fill: "#E4E4E7" })));
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("absolute left-0 md:left-docs_1", "z-10", "h-0 translate-y-0 overflow-hidden transition-transform", open && "h-auto translate-y-docs_0.5 !overflow-visible", className), ref: setRefs },
        react_1.default.createElement("ul", { className: (0, clsx_1.default)("mb-0 py-docs_0.25 overflow-auto rounded-docs_DEFAULT", "bg-medusa-bg-component text-medusa-fg-base", "shadow-elevation-flyout dark:shadow-elevation-flyout-dark list-none", "flex flex-col") },
            addAll && (react_1.default.createElement(react_1.default.Fragment, null,
                getSelectOption({
                    value: "all",
                    label: "All Areas",
                    isAllOption: true,
                }, -1),
                getDivider())),
            options.map(getSelectOption))));
};
exports.SelectDropdown = SelectDropdown;
