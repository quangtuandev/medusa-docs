"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
const react_1 = __importDefault(require("react"));
const Pagination_1 = require("../Pagination");
const Footer = ({ editComponent, showPagination, feedbackComponent, }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        feedbackComponent,
        showPagination && react_1.default.createElement(Pagination_1.Pagination, null),
        editComponent));
};
exports.Footer = Footer;
