"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInView = void 0;
function isInView(element) {
    const rect = element.getBoundingClientRect();
    return (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth));
}
exports.isInView = isInView;
