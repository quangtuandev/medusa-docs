"use client";
import React, { useEffect } from "react";
import { useActiveOnScroll, useScrollController, } from "../../../hooks";
import clsx from "clsx";
import Link from "next/link";
import { useSiteConfig } from "../../../providers";
import { Loading } from "../../Loading";
export const ContentMenuToc = () => {
    const { toc: items, frontmatter, setToc } = useSiteConfig();
    const { items: generatedItems, activeItemId } = useActiveOnScroll({
        maxLevel: 4,
    });
    const formatHeadingContent = (heading) => {
        return Array.from(heading.childNodes)
            .filter((child) => child.nodeType === Node.TEXT_NODE && child.textContent)
            .map((textNode) => textNode.textContent.trim())
            .join("");
    };
    const formatHeadingObject = ({ heading, children, }) => {
        const level = parseInt(heading.tagName.replace("H", ""));
        return {
            title: formatHeadingContent(heading),
            id: heading.id,
            level,
            children: children?.map(formatHeadingObject),
            associatedHeading: heading,
        };
    };
    useEffect(() => {
        if (frontmatter.generate_toc &&
            generatedItems &&
            items?.length !== generatedItems.length) {
            const tocItems = generatedItems.map(formatHeadingObject);
            setToc(tocItems);
        }
    }, [frontmatter, generatedItems]);
    useEffect(() => {
        const activeElement = document.querySelector(".toc-item a[href='#" + activeItemId + "']");
        if (!activeElement) {
            return;
        }
        activeElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
        });
    }, [activeItemId]);
    if (items && !items.length) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement("div", { className: "h-max max-h-full overflow-y-hidden flex relative flex-col" },
        React.createElement("div", { className: "absolute left-0 top-docs_0.5 h-[calc(100%-8px)] w-[1.5px] bg-medusa-border-base" }),
        items !== null && (React.createElement(TocList, { items: items, activeItemId: activeItemId, className: "relative overflow-y-auto" })),
        items === null && React.createElement(EmptyTocItems, null)));
};
const TocList = ({ items, activeItemId, className }) => {
    return (React.createElement("ul", { className: className }, items.map((item) => (React.createElement(TocItem, { item: item, key: item.id, activeItemId: activeItemId })))));
};
const TocItem = ({ item, activeItemId }) => {
    const { scrollToElement } = useScrollController();
    return (React.createElement("li", { className: "w-full pt-docs_0.5 toc-item" },
        React.createElement(Link, { href: `#${item.id}`, className: clsx("text-x-small-plus block w-full relative", item.id !== activeItemId &&
                "text-medusa-fg-muted hover:text-medusa-fg-base border-transparent"), style: {
                paddingLeft: `${(item.level - 1) * 12}px`,
            }, onClick: (e) => {
                e.preventDefault();
                history.pushState({}, "", `#${item.id}`);
                const elm = document.getElementById(item.id);
                scrollToElement(elm);
            } },
            React.createElement("span", { className: clsx("absolute left-0 top-0 w-[1.5px] h-full bg-medusa-fg-base rounded-full", item.id !== activeItemId && "invisible") }),
            item.title),
        (item.children?.length ?? 0) > 0 && (React.createElement(TocList, { items: item.children, activeItemId: activeItemId }))));
};
const EmptyTocItems = () => {
    return (React.createElement("div", { className: "animate-pulse" },
        React.createElement(Loading, { count: 5, className: "pt-docs_0.5 px-docs_0.75 !my-0" })));
};
