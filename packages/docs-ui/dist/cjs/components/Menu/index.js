"use strict";
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const Item_1 = require("./Item");
const Divider_1 = require("./Divider");
const Action_1 = require("./Action");
const SubMenu_1 = require("./SubMenu");
const Menu = ({ items, className, itemsOnClick }) => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("bg-medusa-bg-component py-docs_0.25 rounded-docs_DEFAULT", "shadow-elevation-flyout dark:shadow-elevation-flyout-dark", className) }, items.map((item, index) => (react_1.default.createElement(react_1.default.Fragment, { key: index },
        item.type === "link" && (react_1.default.createElement(Item_1.MenuItem, { item: item, onClick: itemsOnClick })),
        item.type === "action" && (react_1.default.createElement(Action_1.MenuAction, { item: item, onClick: itemsOnClick })),
        item.type === "divider" && react_1.default.createElement(Divider_1.MenuDivider, null),
        item.type === "custom" && item.content,
        item.type === "sub-menu" && (react_1.default.createElement(SubMenu_1.MenuSubMenu, { item: item, itemsOnClick: itemsOnClick })))))));
};
exports.Menu = Menu;
__exportStar(require("./Dropdown"), exports);
