import clsx from "clsx";
import React from "react";
import { MenuItem } from "./Item";
import { MenuDivider } from "./Divider";
import { MenuAction } from "./Action";
import { MenuSubMenu } from "./SubMenu";
export const Menu = ({ items, className, itemsOnClick }) => {
    return (React.createElement("div", { className: clsx("bg-medusa-bg-component py-docs_0.25 rounded-docs_DEFAULT", "shadow-elevation-flyout dark:shadow-elevation-flyout-dark", className) }, items.map((item, index) => (React.createElement(React.Fragment, { key: index },
        item.type === "link" && (React.createElement(MenuItem, { item: item, onClick: itemsOnClick })),
        item.type === "action" && (React.createElement(MenuAction, { item: item, onClick: itemsOnClick })),
        item.type === "divider" && React.createElement(MenuDivider, null),
        item.type === "custom" && item.content,
        item.type === "sub-menu" && (React.createElement(MenuSubMenu, { item: item, itemsOnClick: itemsOnClick })))))));
};
export * from "./Dropdown";
