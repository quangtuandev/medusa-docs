"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeStr = void 0;
function decodeStr(str) {
    return str
        .replaceAll("&#60;", "<")
        .replaceAll("&#123;", "{")
        .replaceAll("&#125;", "}")
        .replaceAll("&#62;", ">")
        .replaceAll("\\|", "|");
}
exports.decodeStr = decodeStr;
