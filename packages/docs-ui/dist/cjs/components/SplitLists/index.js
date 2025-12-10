"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitList = void 0;
const react_1 = __importStar(require("react"));
const Link_1 = require("../Link");
const SplitList = ({ items, listsNum = 2 }) => {
    const lists = (0, react_1.useMemo)(() => {
        const lists = new Array(listsNum).fill(0).map(() => []);
        // Split the items into listsNum lists
        // by pushing each item into the list at index i % listsNum
        // where i is the index of the item in the items array
        // This will create a round-robin distribution of the items
        // across the lists
        // For example, if items = [1, 2, 3, 4, 5] and listsNum = 2
        // the result will be [[1, 3, 5], [2, 4]]
        items.forEach((item, index) => {
            lists[index % listsNum].push(item);
        });
        return lists;
    }, [items, listsNum]);
    return (react_1.default.createElement("div", { className: "flex flex-col md:flex-row gap-docs_0.5 w-full" }, lists.map((list, index) => (react_1.default.createElement("ul", { key: index, className: "flex-1" }, list.map((item) => (react_1.default.createElement("li", { key: item.link, className: "mb-docs_0.5" },
        react_1.default.createElement(Link_1.Link, { href: item.link }, item.title),
        item.description && (react_1.default.createElement(react_1.default.Fragment, null,
            ": ",
            react_1.default.createElement("p", { className: "text-docs_3" }, item.description)))))))))));
};
exports.SplitList = SplitList;
