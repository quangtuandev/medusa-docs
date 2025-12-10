import React, { useMemo } from "react";
import { Link } from "../Link";
export const SplitList = ({ items, listsNum = 2 }) => {
    const lists = useMemo(() => {
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
    return (React.createElement("div", { className: "flex flex-col md:flex-row gap-docs_0.5 w-full" }, lists.map((list, index) => (React.createElement("ul", { key: index, className: "flex-1" }, list.map((item) => (React.createElement("li", { key: item.link, className: "mb-docs_0.5" },
        React.createElement(Link, { href: item.link }, item.title),
        item.description && (React.createElement(React.Fragment, null,
            ": ",
            React.createElement("p", { className: "text-docs_3" }, item.description)))))))))));
};
