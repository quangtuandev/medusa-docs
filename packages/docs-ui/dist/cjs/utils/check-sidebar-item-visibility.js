"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSidebarItemVisibility = void 0;
function checkSidebarItemVisibility(item, withTransition = false, topMargin = 0) {
    return withTransition
        ? checkSidebarItemVisibilityTransition(item, topMargin)
        : checkSidebarItemVisibilityRelative(item, topMargin);
}
exports.checkSidebarItemVisibility = checkSidebarItemVisibility;
function checkSidebarItemVisibilityRelative(item, topMargin) {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) {
        return false;
    }
    const sidebarBoundingRect = sidebar.getBoundingClientRect();
    const sidebarTop = sidebarBoundingRect.top - topMargin;
    const sidebarBottom = sidebarTop + sidebarBoundingRect.height;
    const itemBoundingRect = item.getBoundingClientRect();
    const itemTop = item.offsetParent === sidebar ? item.offsetTop : itemBoundingRect.top;
    const itemBottom = itemTop + itemBoundingRect.height;
    return itemTop >= sidebarTop && itemBottom <= sidebarBottom;
}
function checkSidebarItemVisibilityTransition(item, topMargin) {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) {
        return false;
    }
    const sidebarBoundingRect = sidebar.getBoundingClientRect();
    const activeItemBoundingRect = item.getBoundingClientRect();
    return (activeItemBoundingRect.top >= topMargin &&
        activeItemBoundingRect.top - sidebarBoundingRect.height + topMargin < 0 &&
        activeItemBoundingRect.bottom > 0);
}
