"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeMenuItems = exports.getNavDropdownItems = void 0;
const __1 = require("..");
function getNavDropdownItems({ basePath }) {
    return __1.navDropdownItems.map((item) => {
        const newItem = {
            ...item,
        };
        if (newItem.link) {
            newItem.link = `${basePath}${newItem.link}`;
        }
        if (newItem.type === "dropdown") {
            newItem.children = normalizeMenuItems({
                basePath,
                items: newItem.children,
            });
        }
        return newItem;
    });
}
exports.getNavDropdownItems = getNavDropdownItems;
function normalizeMenuItems({ basePath, items, }) {
    return items.map((item) => {
        const newItem = { ...item };
        if (newItem.type !== "link" && newItem.type !== "sub-menu") {
            return newItem;
        }
        if (newItem.link) {
            newItem.link = `${basePath}${newItem.link}`;
        }
        if (newItem.type === "sub-menu") {
            newItem.items = normalizeMenuItems({
                basePath,
                items: newItem.items,
            });
        }
        return newItem;
    });
}
exports.normalizeMenuItems = normalizeMenuItems;
