"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarTop = void 0;
const react_1 = __importDefault(require("react"));
const Child_1 = require("../Child");
const MobileClose_1 = require("./MobileClose");
const __1 = require("../../..");
const clsx_1 = __importDefault(require("clsx"));
exports.SidebarTop = react_1.default.forwardRef(function SidebarTop(props, ref) {
    const { sidebarHistory } = (0, __1.useSidebar)();
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("pt-docs_0.25 sticky top-0 z-[5]", "bg-medusa-bg-base lg:bg-medusa-bg-subtle"), ref: ref },
        react_1.default.createElement(MobileClose_1.SidebarTopMobileClose, null),
        react_1.default.createElement("div", null, sidebarHistory.length > 1 && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Child_1.SidebarChild, null),
            react_1.default.createElement(__1.DottedSeparator, { wrapperClassName: "!my-0" }))))));
});
