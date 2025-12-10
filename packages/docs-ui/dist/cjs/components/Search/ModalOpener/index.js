"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModalOpener = void 0;
const react_1 = __importDefault(require("react"));
const providers_1 = require("../../../providers");
const components_1 = require("../../../components");
const icons_1 = require("@medusajs/icons");
const hooks_1 = require("../../../hooks");
const SearchModalOpener = ({ isLoading = false, }) => {
    const { setIsOpen } = (0, providers_1.useSearch)();
    (0, hooks_1.useKeyboardShortcut)({
        shortcutKeys: ["k"],
        action: () => setIsOpen((prev) => !prev),
        isLoading,
    });
    const handleOpen = (e) => {
        if (isLoading) {
            return;
        }
        e.preventDefault();
        if ("blur" in e.target && typeof e.target.blur === "function") {
            e.target.blur();
        }
        setIsOpen(true);
    };
    return (react_1.default.createElement(components_1.Button, { variant: "transparent", onClick: handleOpen, className: "flex !p-[6.5px]" },
        react_1.default.createElement(icons_1.MagnifyingGlass, { className: "text-medusa-fg-subtle" })));
};
exports.SearchModalOpener = SearchModalOpener;
