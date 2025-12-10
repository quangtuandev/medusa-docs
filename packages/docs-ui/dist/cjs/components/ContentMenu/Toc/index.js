"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentMenuToc = void 0;
const react_1 = __importStar(require("react"));
const hooks_1 = require("../../../hooks");
const clsx_1 = __importDefault(require("clsx"));
const link_1 = __importDefault(require("next/link"));
const providers_1 = require("../../../providers");
const Loading_1 = require("../../Loading");
const ContentMenuToc = () => {
    const { toc: items, frontmatter, setToc } = (0, providers_1.useSiteConfig)();
    const { items: generatedItems, activeItemId } = (0, hooks_1.useActiveOnScroll)({
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
    (0, react_1.useEffect)(() => {
        if (frontmatter.generate_toc &&
            generatedItems &&
            items?.length !== generatedItems.length) {
            const tocItems = generatedItems.map(formatHeadingObject);
            setToc(tocItems);
        }
    }, [frontmatter, generatedItems]);
    (0, react_1.useEffect)(() => {
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
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("div", { className: "h-max max-h-full overflow-y-hidden flex relative flex-col" },
        react_1.default.createElement("div", { className: "absolute left-0 top-docs_0.5 h-[calc(100%-8px)] w-[1.5px] bg-medusa-border-base" }),
        items !== null && (react_1.default.createElement(TocList, { items: items, activeItemId: activeItemId, className: "relative overflow-y-auto" })),
        items === null && react_1.default.createElement(EmptyTocItems, null)));
};
exports.ContentMenuToc = ContentMenuToc;
const TocList = ({ items, activeItemId, className }) => {
    return (react_1.default.createElement("ul", { className: className }, items.map((item) => (react_1.default.createElement(TocItem, { item: item, key: item.id, activeItemId: activeItemId })))));
};
const TocItem = ({ item, activeItemId }) => {
    const { scrollToElement } = (0, hooks_1.useScrollController)();
    return (react_1.default.createElement("li", { className: "w-full pt-docs_0.5 toc-item" },
        react_1.default.createElement(link_1.default, { href: `#${item.id}`, className: (0, clsx_1.default)("text-x-small-plus block w-full relative", item.id !== activeItemId &&
                "text-medusa-fg-muted hover:text-medusa-fg-base border-transparent"), style: {
                paddingLeft: `${(item.level - 1) * 12}px`,
            }, onClick: (e) => {
                e.preventDefault();
                history.pushState({}, "", `#${item.id}`);
                const elm = document.getElementById(item.id);
                scrollToElement(elm);
            } },
            react_1.default.createElement("span", { className: (0, clsx_1.default)("absolute left-0 top-0 w-[1.5px] h-full bg-medusa-fg-base rounded-full", item.id !== activeItemId && "invisible") }),
            item.title),
        (item.children?.length ?? 0) > 0 && (react_1.default.createElement(TocList, { items: item.children, activeItemId: activeItemId }))));
};
const EmptyTocItems = () => {
    return (react_1.default.createElement("div", { className: "animate-pulse" },
        react_1.default.createElement(Loading_1.Loading, { count: 5, className: "pt-docs_0.5 px-docs_0.75 !my-0" })));
};
