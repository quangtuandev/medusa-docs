"use client";
import React from "react";
import { useSimilarPages } from "../../hooks";
import { H2 } from "../Heading";
import { MDXComponents } from "../MDXComponents";
const P = MDXComponents.p;
const Ul = MDXComponents.ul;
const Li = MDXComponents.li;
const A = MDXComponents.a;
export const SimilarPages = () => {
    const similarPages = useSimilarPages();
    if (!similarPages.length) {
        return null;
    }
    return (React.createElement("div", null,
        React.createElement(H2, null, "Similar Pages"),
        React.createElement(P, null, "Maybe you're looking for:"),
        React.createElement(Ul, null, similarPages.map((page) => (React.createElement(Li, { key: page.id },
            React.createElement(A, { href: page.url }, page.title)))))));
};
