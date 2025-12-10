"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const react_1 = __importDefault(require("react"));
const ui_1 = require("@medusajs/ui");
const clsx_1 = __importDefault(require("clsx"));
const Root = ({ className, ...props }) => {
    return (react_1.default.createElement(ui_1.Table, { className: (0, clsx_1.default)(className, "table-fixed mb-docs_1", "[&_pre_span]:!max-w-full [&_pre_span]:!break-words [&_pre_span]:!whitespace-break-spaces", "[&_pre>div]:mt-docs_1", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "rounded-docs_DEFAULT"), ...props }));
};
const Header = ({ className, ...props }) => {
    return (react_1.default.createElement(ui_1.Table.Header, { className: (0, clsx_1.default)(className, "!border-0 bg-medusa-bg-component [&_tr]:!bg-medusa-bg-component", "rounded-docs_DEFAULT [&_tr]:rounded-docs_DEFAULT"), ...props }));
};
const HeaderCell = ({ className, ...props }) => {
    return (react_1.default.createElement(ui_1.Table.HeaderCell, { className: (0, clsx_1.default)(className, "text-left !px-docs_0.75 py-docs_0.5 break-words", "!text-compact-small-plus text-medusa-fg-subtle", "first:rounded-tl-docs_DEFAULT last:rounded-tr-docs_DEFAULT"), ...props }));
};
const Cell = ({ className, ...props }) => {
    return (react_1.default.createElement(ui_1.Table.Cell, { className: (0, clsx_1.default)(className, "!px-docs_0.75 py-docs_0.5 break-words align-top"), ...props }));
};
const Body = ({ className, ...props }) => {
    return (react_1.default.createElement(ui_1.Table.Body, { className: (0, clsx_1.default)(className, "[&_tr:last-child]:border-b-0 border-b-0"), ...props }));
};
const Table = Object.assign(Root, {
    Row: ui_1.Table.Row,
    Cell,
    Header,
    HeaderCell,
    Body,
});
exports.Table = Table;
