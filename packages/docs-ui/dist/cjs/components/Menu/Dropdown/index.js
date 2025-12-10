"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownMenu = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const __1 = require("../../..");
const clsx_1 = __importDefault(require("clsx"));
const DropdownMenu = ({ dropdownButtonContent, dropdownButtonClassName, menuComponent, menuItems, menuClassName, className, open: externalOpen = false, setOpen: externalSetOpen, }) => {
    const [open, setOpen] = (0, react_2.useState)(externalOpen);
    const ref = (0, react_2.useRef)(null);
    function changeOpenState(newOpenState) {
        if (externalSetOpen) {
            externalSetOpen(newOpenState);
        }
        else {
            setOpen(newOpenState);
        }
    }
    (0, __1.useClickOutside)({
        elmRef: ref,
        onClickOutside: () => {
            changeOpenState(false);
        },
    });
    if (!menuComponent && !menuItems) {
        return null;
    }
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("relative", className) },
        react_1.default.createElement(__1.Button, { variant: "transparent", onClick: () => changeOpenState(!open), className: (0, clsx_1.default)("!p-[6px] text-medusa-fg-subtle", dropdownButtonClassName), buttonRef: ref }, dropdownButtonContent),
        menuComponent,
        !menuComponent && menuItems && (react_1.default.createElement(__1.Menu, { items: menuItems, className: (0, clsx_1.default)("absolute right-0 top-[calc(100%+8px)] w-max", !open && "hidden", menuClassName) }))));
};
exports.DropdownMenu = DropdownMenu;
