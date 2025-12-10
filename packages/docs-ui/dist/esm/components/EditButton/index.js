import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRightOnBox } from "@medusajs/icons";
import { EditDate } from "../EditDate";
export const EditButton = ({ filePath, editDate }) => {
    return (React.createElement("div", { className: "flex flex-wrap gap-docs_0.5 mt-docs_2 text-medusa-fg-subtle" },
        editDate && React.createElement(EditDate, { date: editDate }),
        React.createElement(Link, { href: `https://github.com/medusajs/medusa/edit/develop${filePath}`, className: clsx("flex w-fit gap-docs_0.25 items-center", "text-medusa-fg-subtle hover:text-medusa-fg-base", "text-compact-small-plus") },
            React.createElement("span", null, "Edit this page"),
            React.createElement(ArrowUpRightOnBox, null))));
};
