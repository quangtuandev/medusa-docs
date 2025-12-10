"use client";
import React from "react";
import { Button } from "../../Button";
import { Tooltip } from "../../Tooltip";
import { Kbd } from "../../Kbd";
import { getOsShortcut } from "../../../utils";
import { useAiAssistant, useSearch, useSiteConfig } from "../../../providers";
import { useKeyboardShortcut } from "../../../hooks";
import Image from "next/image";
const AI_ASSISTANT_ICON_ACTIVE = "/images/ai-assistent.png";
export const AiAssistantTriggerButton = () => {
    const { config } = useSiteConfig();
    const { setChatOpened } = useAiAssistant();
    const { setIsOpen } = useSearch();
    const osShortcut = getOsShortcut();
    useKeyboardShortcut({
        metakey: true,
        shortcutKeys: ["i"],
        action: () => {
            setChatOpened((prev) => !prev);
            setIsOpen(false);
        },
        checkEditing: false,
    });
    return (React.createElement(Tooltip, { render: () => (React.createElement("span", { className: "flex gap-[5px] items-center" },
            React.createElement(Kbd, { className: "bg-medusa-bg-field-component border-medusa-border-strong w-[18px] h-[18px] inline-block" }, osShortcut),
            React.createElement(Kbd, { className: "bg-medusa-bg-field-component border-medusa-border-strong w-[18px] h-[18px] inline-block" }, "i"))) },
        React.createElement(Button, { variant: "transparent-clear", onClick: () => setChatOpened((prev) => !prev) },
            React.createElement(Image, { src: `${config.basePath}${AI_ASSISTANT_ICON_ACTIVE}`, width: 15, height: 15, alt: "AI Assistant" }),
            React.createElement("span", { className: "hidden md:inline-block text-medusa-fg-subtle" }, "Ask AI"))));
};
