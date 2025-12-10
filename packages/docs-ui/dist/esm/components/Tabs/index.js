"use client";
import React, { useMemo } from "react";
import { Tabs as UiTabs } from "@medusajs/ui";
import clsx from "clsx";
import { EllipseMiniSolid } from "@medusajs/icons";
import { useMobile } from "../..";
export const Tabs = ({ layoutType = "horizontal", className, ...props }) => {
    const { isMobile } = useMobile();
    const layout = useMemo(() => {
        return isMobile ? "horizontal" : layoutType;
    }, [layoutType, isMobile]);
    return (React.createElement(UiTabs, { ...props, className: clsx(className, layout === "vertical" && [
            "flex gap-docs_1",
            "[&_[role=tablist]]:flex-col [&_[role=tablist]]:items-start",
            "[&_[role=tablist]+*]:flex-1 [&_[role=tablist]+*]:!mt-0",
            "[&_[role=tablist]+*]:w-3/4 [&_[role=tablist]]:w-1/4",
        ]) }));
};
export const TabsList = ({ className, ...props }) => (React.createElement(UiTabs.List, { ...props, className: clsx(className, "gap-docs_0.5") }));
export const TabsTrigger = ({ className, ...props }) => (React.createElement(UiTabs.Trigger, { ...props, className: clsx(className, "px-[10px] py-docs_0.25 data-[state=active]:text-ui-fg-base data-[state=active]:bg-ui-bg-base data-[state=active]:shadow-elevation-card-rest", "hover:text-ui-fg-base focus-visible:border-ui-border-interactive focus-visible:!shadow-borders-focus focus-visible:bg-ui-bg-base") }));
export const TabsTriggerVertical = ({ className, children, ...props }) => {
    const { isMobile } = useMobile();
    if (isMobile) {
        return (React.createElement(TabsTrigger, { className: className, ...props }, children));
    }
    return (React.createElement(UiTabs.Trigger, { ...props, className: clsx(className, "px-docs_0.5 py-docs_0.25 !text-medusa-fg-base text-compact-small data-[state=active]:!text-compact-small-plus", "[&[data-state=active]_svg]:!visible hover:!bg-medusa-bg-base-hover rounded-docs_DEFAULT", "!shadow-none") },
        React.createElement(EllipseMiniSolid, { className: "invisible" }),
        children));
};
export const TabsContentWrapper = ({ className, ...props }) => (React.createElement("div", { ...props, className: clsx(className, "mt-docs_0.5") }));
export const TabsContent = (props) => (React.createElement(UiTabs.Content, { ...props }));
