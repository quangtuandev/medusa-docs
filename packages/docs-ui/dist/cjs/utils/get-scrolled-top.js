"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScrolledTop = void 0;
const is_elm_window_1 = require("./is-elm-window");
function getScrolledTop(elm) {
    if (!elm) {
        return 0;
    }
    return (0, is_elm_window_1.isElmWindow)(elm) ? elm.scrollY : elm.scrollTop;
}
exports.getScrolledTop = getScrolledTop;
