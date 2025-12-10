"use client";
import React from "react";
import { usePagination } from "../../providers";
import clsx from "clsx";
import { PaginationCard } from "./Card";
export const Pagination = () => {
    const { previousPage, nextPage } = usePagination();
    return (React.createElement("div", { className: clsx("flex justify-between", "flex-col sm:flex-row gap-docs_0.75") },
        previousPage && (React.createElement(PaginationCard, { type: "previous", title: previousPage.title, parentTitle: previousPage.parentTitle, link: previousPage.link })),
        nextPage && (React.createElement(PaginationCard, { type: "next", title: nextPage.title, parentTitle: nextPage.parentTitle, link: nextPage.link }))));
};
