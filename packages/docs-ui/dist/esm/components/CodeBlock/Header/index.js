"use client";
import React, { useMemo } from "react";
import clsx from "clsx";
import { useColorMode } from "../../../providers";
import { Badge } from "../../../components";
import { CodeBlockActions } from "../Actions";
import { CodeBlockHeaderWrapper } from "./Wrapper";
export const CodeBlockHeader = ({ title, blockStyle = "loud", badgeLabel, actionsProps, badgeColor, hideActions = false, }) => {
    const { colorMode } = useColorMode();
    const titleColor = useMemo(() => clsx(blockStyle === "loud" && "text-medusa-contrast-fg-secondary", blockStyle === "subtle" && [
        colorMode === "light" && "text-medusa-fg-subtle",
        colorMode === "dark" && "text-medusa-contrast-fg-secondary",
    ]), [blockStyle, colorMode]);
    return (React.createElement(CodeBlockHeaderWrapper, { blockStyle: blockStyle },
        React.createElement("div", { className: clsx("flex-1", "flex gap-docs_0.75 items-start") },
            badgeLabel && (React.createElement(Badge, { variant: badgeColor || "code", className: "font-base" }, badgeLabel)),
            title && (React.createElement("div", { className: clsx("text-compact-x-small font-base", titleColor) }, title))),
        !hideActions && React.createElement(CodeBlockActions, { ...actionsProps })));
};
