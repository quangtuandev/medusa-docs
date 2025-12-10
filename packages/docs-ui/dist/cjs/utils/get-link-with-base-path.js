"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkWithBasePath = void 0;
function getLinkWithBasePath(path, basePath) {
    return `${basePath || ""}${path}`;
}
exports.getLinkWithBasePath = getLinkWithBasePath;
