"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonLd = void 0;
function getJsonLd(data) {
    return JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
}
exports.getJsonLd = getJsonLd;
