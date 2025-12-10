"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalSearch = void 0;
const minisearch_1 = __importDefault(require("minisearch"));
const getLocalSearch = ({ docs, searchableFields, options, }) => {
    try {
        const miniSearch = new minisearch_1.default({
            fields: searchableFields,
            ...options,
        });
        miniSearch.addAll(docs);
        return miniSearch;
    }
    catch (e) {
        console.warn(e);
    }
};
exports.getLocalSearch = getLocalSearch;
