"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimilarPages = void 0;
const react_1 = __importDefault(require("react"));
const hooks_1 = require("../../hooks");
const Heading_1 = require("../Heading");
const MDXComponents_1 = require("../MDXComponents");
const P = MDXComponents_1.MDXComponents.p;
const Ul = MDXComponents_1.MDXComponents.ul;
const Li = MDXComponents_1.MDXComponents.li;
const A = MDXComponents_1.MDXComponents.a;
const SimilarPages = () => {
    const similarPages = (0, hooks_1.useSimilarPages)();
    if (!similarPages.length) {
        return null;
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Heading_1.H2, null, "Similar Pages"),
        react_1.default.createElement(P, null, "Maybe you're looking for:"),
        react_1.default.createElement(Ul, null, similarPages.map((page) => (react_1.default.createElement(Li, { key: page.id },
            react_1.default.createElement(A, { href: page.url }, page.title)))))));
};
exports.SimilarPages = SimilarPages;
