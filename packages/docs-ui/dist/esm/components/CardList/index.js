import React from "react";
import { Card } from "../../components";
import clsx from "clsx";
export const CardList = ({ items, itemsPerRow, className, defaultItemsPerRow, }) => {
    if (!itemsPerRow) {
        // if length of items is even, set to `2`, else set to `3`
        itemsPerRow =
            items.length === 1
                ? 1
                : defaultItemsPerRow || (items.length % 2 === 0 ? 2 : 3);
    }
    return (React.createElement("section", { className: clsx("grid gap-x-docs_1 auto-rows-fr gap-y-docs_1", itemsPerRow === 1 && "grid-cols-1", itemsPerRow === 2 && "md:grid-cols-2 grid-cols-1", itemsPerRow === 3 && "lg:grid-cols-3 md:grid-col-2 grid-cols-1", className) }, items.map((item, key) => (React.createElement(Card, { ...item, key: key })))));
};
