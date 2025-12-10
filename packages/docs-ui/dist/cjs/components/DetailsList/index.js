"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsList = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../components");
const DetailsList = ({ sections }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null, sections.map(({ title, content }, index) => (react_1.default.createElement(components_1.Details, { summaryContent: title, key: index, className: (0, clsx_1.default)(index !== 0 && "border-t-0") },
        react_1.default.isValidElement(content) && content,
        !react_1.default.isValidElement(content) && typeof content === "string" && (react_1.default.createElement(components_1.MarkdownContent, null, content)))))));
};
exports.DetailsList = DetailsList;
