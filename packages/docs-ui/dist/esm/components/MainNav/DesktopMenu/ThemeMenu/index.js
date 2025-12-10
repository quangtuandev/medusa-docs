"use client";
import React from "react";
import { useColorMode } from "../../../../providers";
import clsx from "clsx";
import { EllipseMiniSolid } from "@medusajs/icons";
export const MainNavThemeMenu = () => {
    const { colorMode, setColorMode } = useColorMode();
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: clsx("flex items-center gap-docs_0.5", "py-docs_0.25 px-docs_0.5", "rounded-docs_xs text-compact-x-small-plus", "text-medusa-fg-subtle") }, "Theme"),
        React.createElement("div", { className: "px-docs_0.25" },
            React.createElement("div", { className: clsx("flex items-center gap-docs_0.5", "py-docs_0.25 px-docs_0.5 cursor-pointer", "rounded-docs_xs text-medusa-fg-base", "hover:bg-medusa-bg-component-hover"), tabIndex: -1, onClick: () => setColorMode("light") },
                React.createElement(EllipseMiniSolid, { className: clsx(colorMode !== "light" && "invisible") }),
                React.createElement("span", { className: clsx(colorMode !== "light" && "text-compact-small", colorMode === "light" && "text-compact-small-plus") }, "Light"))),
        React.createElement("div", { className: "px-docs_0.25" },
            React.createElement("div", { className: clsx("flex items-center gap-docs_0.5", "py-docs_0.25 px-docs_0.5 cursor-pointer", "rounded-docs_xs text-medusa-fg-base", "hover:bg-medusa-bg-component-hover"), tabIndex: -1, onClick: () => setColorMode("dark") },
                React.createElement(EllipseMiniSolid, { className: clsx(colorMode !== "dark" && "invisible") }),
                React.createElement("span", { className: clsx(colorMode !== "dark" && "text-compact-small", colorMode === "dark" && "text-compact-small-plus") }, "Dark")))));
};
