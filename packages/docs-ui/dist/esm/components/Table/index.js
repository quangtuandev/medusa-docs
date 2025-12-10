import React from "react";
import { Table as UiTable } from "@medusajs/ui";
import clsx from "clsx";
const Root = ({ className, ...props }) => {
    return (React.createElement(UiTable, { className: clsx(className, "table-fixed mb-docs_1", "[&_pre_span]:!max-w-full [&_pre_span]:!break-words [&_pre_span]:!whitespace-break-spaces", "[&_pre>div]:mt-docs_1", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "rounded-docs_DEFAULT"), ...props }));
};
const Header = ({ className, ...props }) => {
    return (React.createElement(UiTable.Header, { className: clsx(className, "!border-0 bg-medusa-bg-component [&_tr]:!bg-medusa-bg-component", "rounded-docs_DEFAULT [&_tr]:rounded-docs_DEFAULT"), ...props }));
};
const HeaderCell = ({ className, ...props }) => {
    return (React.createElement(UiTable.HeaderCell, { className: clsx(className, "text-left !px-docs_0.75 py-docs_0.5 break-words", "!text-compact-small-plus text-medusa-fg-subtle", "first:rounded-tl-docs_DEFAULT last:rounded-tr-docs_DEFAULT"), ...props }));
};
const Cell = ({ className, ...props }) => {
    return (React.createElement(UiTable.Cell, { className: clsx(className, "!px-docs_0.75 py-docs_0.5 break-words align-top"), ...props }));
};
const Body = ({ className, ...props }) => {
    return (React.createElement(UiTable.Body, { className: clsx(className, "[&_tr:last-child]:border-b-0 border-b-0"), ...props }));
};
const Table = Object.assign(Root, {
    Row: UiTable.Row,
    Cell,
    Header,
    HeaderCell,
    Body,
});
export { Table };
