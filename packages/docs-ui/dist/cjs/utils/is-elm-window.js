"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isElmWindow = void 0;
function isElmWindow(elm) {
    return typeof window !== "undefined" && elm === window;
}
exports.isElmWindow = isElmWindow;
