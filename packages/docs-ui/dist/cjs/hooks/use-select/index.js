"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelect = void 0;
const react_1 = require("react");
const useSelect = ({ value, options, multiple = false, setSelected, addSelected, removeSelected, handleAddAll, }) => {
    const isValueSelected = (0, react_1.useCallback)((val) => {
        return ((typeof value === "string" && val === value) ||
            (Array.isArray(value) && value.includes(val)));
    }, [value]);
    // checks if there are multiple selected values
    const hasSelectedValues = (0, react_1.useMemo)(() => {
        return multiple && Array.isArray(value) && value.length > 0;
    }, [value, multiple]);
    // checks if there are any selected values,
    // whether multiple or one
    const hasSelectedValue = (0, react_1.useMemo)(() => {
        return hasSelectedValues || (typeof value === "string" && value.length);
    }, [hasSelectedValues, value]);
    const selectedValues = (0, react_1.useMemo)(() => {
        if (typeof value === "string") {
            const selectedValue = options.find((option) => option.value === value);
            return selectedValue ? [selectedValue] : [];
        }
        else if (Array.isArray(value)) {
            return options.filter((option) => value.includes(option.value));
        }
        return [];
    }, [options, value]);
    const isAllSelected = (0, react_1.useMemo)(() => {
        return Array.isArray(value) && value.length === options.length;
    }, [options, value]);
    const handleChange = (selectedValue, wasSelected) => {
        if (multiple) {
            if (wasSelected) {
                removeSelected?.(selectedValue);
            }
            else {
                addSelected?.(selectedValue);
            }
        }
        else {
            setSelected?.(selectedValue);
        }
    };
    const handleSelectAll = () => {
        if (handleAddAll) {
            handleAddAll(isAllSelected);
        }
        else {
            setSelected?.(options.map((option) => option.value));
        }
    };
    const setSelectedValues = (values) => {
        setSelected?.(values);
    };
    return {
        isValueSelected,
        hasSelectedValue,
        hasSelectedValues,
        selectedValues,
        isAllSelected,
        handleChange,
        handleSelectAll,
        setSelectedValues,
    };
};
exports.useSelect = useSelect;
