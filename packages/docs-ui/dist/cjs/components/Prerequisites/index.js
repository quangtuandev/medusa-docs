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
exports.Prerequisites = void 0;
const react_1 = __importStar(require("react"));
const __1 = require("../..");
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const Item_1 = require("./Item");
const Prerequisites = ({ items }) => {
    const itemsRef = (0, react_1.useRef)(null);
    const { collapsed, getCollapsibleElms, setCollapsed } = (0, __1.useCollapsible)({
        initialValue: false,
        translateEnabled: false,
        childrenRef: itemsRef,
        useChild: false,
    });
    const getPosition = (index) => {
        if (items.length === 1) {
            return "alone";
        }
        if (index === items.length - 1) {
            return "bottom";
        }
        return index === 0 ? "top" : "middle";
    };
    return (react_1.default.createElement("details", { open: !collapsed, onClick: (event) => {
            if (event.target instanceof HTMLAnchorElement) {
                return;
            }
            event.preventDefault();
        }, onToggle: (event) => {
            // this is to avoid event propagation
            // when details are nested, which is a bug
            // in react. Learn more here:
            // https://github.com/facebook/react/issues/22718
            event.stopPropagation();
        }, className: "my-docs_1" },
        react_1.default.createElement("summary", { className: "flex no-marker items-center mb-[6px] w-fit", onClick: () => setCollapsed((prev) => !prev) },
            react_1.default.createElement(__1.Button, { className: (0, clsx_1.default)("flex items-center", "px-docs_0.5 py-docs_0.25", "text-medusa-fg-subtle", "active:!outline-none active:!shadow-none", "focus:!outline-none focus:!shadow-none"), variant: "transparent-clear" },
                react_1.default.createElement(icons_1.TriangleRightMini, { className: (0, clsx_1.default)("transition-transform", !collapsed && "rotate-90") }),
                react_1.default.createElement("span", { className: "text-compact-small-plus block ml-[6px]" }, "Prerequisites"),
                react_1.default.createElement("span", { className: "fg-muted text-compact-small" }, items.length))),
        getCollapsibleElms(react_1.default.createElement("div", { className: "flex gap-[6px] flex-col", ref: itemsRef }, items.map((item, index) => (react_1.default.createElement(Item_1.PrerequisiteItem, { item: {
                ...item,
                position: getPosition(index),
            }, key: index })))))));
};
exports.Prerequisites = Prerequisites;
