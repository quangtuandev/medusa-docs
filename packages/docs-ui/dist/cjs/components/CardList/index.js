"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardList = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("../../components");
const clsx_1 = __importDefault(require("clsx"));
const CardList = ({ items, itemsPerRow, className, defaultItemsPerRow, }) => {
    if (!itemsPerRow) {
        // if length of items is even, set to `2`, else set to `3`
        itemsPerRow =
            items.length === 1
                ? 1
                : defaultItemsPerRow || (items.length % 2 === 0 ? 2 : 3);
    }
    return (react_1.default.createElement("section", { className: (0, clsx_1.default)("grid gap-x-docs_1 auto-rows-fr gap-y-docs_1", itemsPerRow === 1 && "grid-cols-1", itemsPerRow === 2 && "md:grid-cols-2 grid-cols-1", itemsPerRow === 3 && "lg:grid-cols-3 md:grid-col-2 grid-cols-1", className) }, items.map((item, key) => (react_1.default.createElement(components_1.Card, { ...item, key: key })))));
};
exports.CardList = CardList;
