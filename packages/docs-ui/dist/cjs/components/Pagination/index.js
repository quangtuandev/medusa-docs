"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
const react_1 = __importDefault(require("react"));
const providers_1 = require("../../providers");
const clsx_1 = __importDefault(require("clsx"));
const Card_1 = require("./Card");
const Pagination = () => {
    const { previousPage, nextPage } = (0, providers_1.usePagination)();
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex justify-between", "flex-col sm:flex-row gap-docs_0.75") },
        previousPage && (react_1.default.createElement(Card_1.PaginationCard, { type: "previous", title: previousPage.title, parentTitle: previousPage.parentTitle, link: previousPage.link })),
        nextPage && (react_1.default.createElement(Card_1.PaginationCard, { type: "next", title: nextPage.title, parentTitle: nextPage.parentTitle, link: nextPage.link }))));
};
exports.Pagination = Pagination;
