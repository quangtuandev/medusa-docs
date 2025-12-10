"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Details, CopyButton, DetailsSummary, ExpandableNotice, FeatureFlagNotice, InlineCode, MarkdownContent, MDXComponents, } from "../../../components";
import clsx from "clsx";
import { ArrowDownLeftMini, ArrowsPointingOutMini, FlagMini, Link, TriangleRightMini, } from "@medusajs/icons";
import { decodeStr, isInView } from "../../../utils";
import { usePathname } from "next/navigation";
import { useIsBrowser, useSiteConfig } from "../../..";
import { VersionNotice } from "../../Notices/VersionNotice";
import { DeprecatedNotice } from "../../Notices/DeprecatedNotice";
const TypeListItem = ({ typeItem, level = 1, expandUrl, elementKey, sectionTitle, referenceType = "method", openedLevel = 0, }) => {
    const { isBrowser } = useIsBrowser();
    const pathname = usePathname();
    const { config: { baseUrl, basePath }, } = useSiteConfig();
    const siteUrl = `${baseUrl}${basePath}`;
    const groupName = useMemo(() => {
        switch (level) {
            case 1:
                return "group/typeOne";
            case 2:
                return "group/typeTwo";
            case 3:
                return "group/typeThree";
            case 4:
                return "group/typeFour";
        }
    }, [level]);
    const borderForGroupName = useMemo(() => {
        switch (level) {
            case 1:
                return "group-open/typeOne:border-solid group-open/typeOne:border-0 group-open/typeOne:border-b";
            case 2:
                return "group-open/typeTwo:border-solid group-open/typeTwo:border-0 group-open/typeTwo:border-b";
            case 3:
                return "group-open/typeThree:border-solid group-open/typeThree:border-0 group-open/typeThree:border-b";
            case 4:
                return "group-open/typeFour:border-solid group-open/typeFour:border-0 group-open/typeFour:border-b";
        }
    }, [level]);
    const rotateForGroupName = useMemo(() => {
        switch (level) {
            case 1:
                return "group-open/typeOne:rotate-90";
            case 2:
                return "group-open/typeTwo:rotate-90";
            case 3:
                return "group-open/typeThree:rotate-90";
            case 4:
                return "group-open/typeFour:rotate-90";
        }
    }, [level]);
    function getItemClassNames(details = true) {
        return clsx("odd:[&:not(:first-child):not(:last-child)]:!border-y last:not(:first-child):!border-t", "first:!border-t-0 first:not(:last-child):!border-b last:!border-b-0 even:!border-y-0", details && groupName, !details && borderForGroupName);
    }
    const formatId = (str) => {
        return str.replaceAll(" ", "_");
    };
    const typeId = useMemo(() => {
        return sectionTitle
            ? `#${formatId(sectionTitle)}-${formatId(typeItem.name)}-${level}-${elementKey}`
            : "";
    }, [sectionTitle, typeItem, elementKey]);
    const typePath = useMemo(() => `${pathname}${typeId}`, [pathname, typeId]);
    const typeUrl = useMemo(() => `${siteUrl}${typePath}`, [siteUrl, typePath]);
    const ref = useRef(null);
    const [isSelected, setIsSelected] = useState(false);
    useEffect(() => {
        if (!typeId.length || !isBrowser) {
            return;
        }
        const shouldScroll = window.location.hash === typeId;
        if (shouldScroll && !isSelected && ref.current && !isInView(ref.current)) {
            ref.current.scrollIntoView({
                block: "center",
            });
        }
        setIsSelected(shouldScroll);
    }, [typeId, isBrowser]);
    function getSummary(item, nested = true) {
        return (React.createElement(DetailsSummary, { subtitle: item.description || item.defaultValue ? (React.createElement(React.Fragment, null,
                item.description && (React.createElement(MarkdownContent, { allowedElements: [
                        "a",
                        "strong",
                        "code",
                        "ul",
                        "ol",
                        "li",
                        "br",
                    ], unwrapDisallowed: true, components: {
                        ...MDXComponents,
                        ol: (props) => (
                        // @ts-expect-error Not recognized as a JSX element
                        React.createElement(MDXComponents.ol, { ...props, className: clsx(props.className, "mt-docs_1.5") })),
                        li: (props) => (
                        // @ts-expect-error Not recognized as a JSX element
                        React.createElement(MDXComponents.li, { ...props, className: clsx(props.className, "!text-medusa-fg-subtle") })),
                    } }, item.description)),
                item.defaultValue && (React.createElement("p", { className: "mt-0.5 mb-0" },
                    "Default: ",
                    React.createElement(InlineCode, null, item.defaultValue))))) : undefined, expandable: (item.children?.length || 0) > 0, hideExpandableIcon: true, className: clsx(getItemClassNames(false), "py-1 pr-1", level === 1 && "pl-1", level === 2 && "pl-3", level === 3 && "pl-[120px]", level === 4 && "pl-[160px]", !nested && "cursor-auto", isSelected && "animate-flash animate-bg-surface"), onClick: (e) => {
                const targetElm = e.target;
                if (targetElm.tagName.toLowerCase() === "a") {
                    window.location.href =
                        targetElm.getAttribute("href") || window.location.href;
                    return;
                }
            }, summaryRef: !nested ? ref : undefined, id: !nested && typeId ? typeId : "" },
            React.createElement("div", { className: "flex gap-0.5" },
                nested && (React.createElement(TriangleRightMini, { className: clsx("text-medusa-fg-subtle transition-transform", rotateForGroupName) })),
                !nested && level > 1 && (React.createElement(ArrowDownLeftMini, { className: clsx("text-medusa-fg-subtle flip-y") })),
                level === 1 && typeId.length > 0 && (React.createElement(CopyButton, { text: typeUrl, onCopy: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    } },
                    React.createElement(Link, { className: clsx("text-medusa-fg-interactive hover:text-medusa-fg-interactive-hover") }))),
                React.createElement("div", { className: "flex gap-0.75 flex-wrap flex-1" },
                    React.createElement(InlineCode, null, decodeStr(item.name)),
                    React.createElement("span", { className: "font-monospace text-compact-small-plus text-medusa-fg-subtle" },
                        React.createElement(MarkdownContent, { allowedElements: ["a"], unwrapDisallowed: true }, item.type)),
                    item.optional === true && (React.createElement("span", { className: clsx("text-compact-x-small-plus", "text-medusa-tag-blue-text") }, "Optional")),
                    item.featureFlag && (React.createElement(FeatureFlagNotice, { featureFlag: item.featureFlag, type: "type", badgeClassName: "!p-0 leading-none", badgeContent: React.createElement(FlagMini, { className: "!text-medusa-tag-green-text" }) })),
                    item.expandable && (React.createElement(ExpandableNotice, { type: referenceType, link: expandUrl || "#", badgeClassName: "!p-docs_0.25 block leading-none", badgeContent: React.createElement(ArrowsPointingOutMini, null) })),
                    item.since && (React.createElement(VersionNotice, { version: item.since, badgeClassName: "!p-0 leading-none" })),
                    item.deprecated?.is_deprecated && (React.createElement(DeprecatedNotice, { description: item.deprecated?.description }))))));
    }
    return (React.createElement(React.Fragment, null,
        (typeItem.children?.length || 0) > 0 && (React.createElement(Details, { summaryElm: getSummary(typeItem), className: clsx(getItemClassNames()), heightAnimation: true, id: typeId ? typeId : "", openInitial: openedLevel >= level }, typeItem.children && (React.createElement(TypeListItems, { types: typeItem.children, level: level + 1, expandUrl: expandUrl })))),
        (typeItem.children?.length || 0) === 0 && getSummary(typeItem, false)));
};
const TypeListItems = ({ types, ...rest }) => {
    return (React.createElement("div", null, types.map((typeItem, key) => (React.createElement(TypeListItem, { typeItem: typeItem, key: key, elementKey: key, ...rest })))));
};
export default TypeListItems;
