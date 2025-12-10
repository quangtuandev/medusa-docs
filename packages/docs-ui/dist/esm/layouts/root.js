import React from "react";
import clsx from "clsx";
import { RootProviders, Sidebar } from "../components";
import { MainContentLayout } from "./main-content";
import { AiAssistantChatWindow } from "../components/AiAssistant/ChatWindow";
import { TechArticleJsonLd } from "../components/TechArticleJsonLd";
export const RootLayout = ({ bodyClassName, sidebarProps, ProvidersComponent, ...mainProps }) => {
    return (React.createElement("body", { className: clsx("h-screen w-full overflow-hidden") },
        React.createElement("div", { className: clsx("bg-medusa-bg-subtle font-base text-medium w-full", "text-medusa-fg-base", "h-full overflow-hidden", "grid grid-cols-1 lg:mx-auto lg:grid-cols-[221px_1fr]", bodyClassName), id: "root-layout" },
            React.createElement(RootProviders, null,
                React.createElement(ProvidersComponent, null,
                    React.createElement(Sidebar, { ...sidebarProps }),
                    React.createElement("div", { className: clsx("relative", "h-screen", "flex") },
                        React.createElement(MainContentLayout, { ...mainProps }),
                        React.createElement(AiAssistantChatWindow, null)),
                    React.createElement(TechArticleJsonLd, null))))));
};
