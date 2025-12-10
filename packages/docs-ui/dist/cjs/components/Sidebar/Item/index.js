"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarItem = void 0;
const react_1 = __importDefault(require("react"));
const Link_1 = require("./Link");
const SubCategory_1 = require("./SubCategory");
const __1 = require("../..");
const Category_1 = require("./Category");
const Sidebar_1 = require("./Sidebar");
const SidebarItem = ({ item, hasNextItems = false, ...props }) => {
    switch (item.type) {
        case "category":
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Category_1.SidebarItemCategory, { item: item, ...props }),
                hasNextItems && react_1.default.createElement(__1.DottedSeparator, null)));
        case "sub-category":
            return react_1.default.createElement(SubCategory_1.SidebarItemSubCategory, { item: item, ...props });
        case "link":
        case "ref":
        case "external":
            return react_1.default.createElement(Link_1.SidebarItemLink, { item: item, ...props });
        case "sidebar":
            return react_1.default.createElement(Sidebar_1.SidebarItemSidebar, { item: item, ...props });
        case "separator":
            return react_1.default.createElement(__1.DottedSeparator, null);
    }
};
exports.SidebarItem = SidebarItem;
