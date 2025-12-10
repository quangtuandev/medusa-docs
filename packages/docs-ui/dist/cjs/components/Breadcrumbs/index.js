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
exports.Breadcrumbs = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const link_1 = __importDefault(require("next/link"));
const providers_1 = require("../../providers");
const Button_1 = require("../Button");
const icons_1 = require("@medusajs/icons");
const utils_1 = require("../../utils");
const Breadcrumbs = () => {
    const { sidebarHistory, getSidebarFirstLinkChild, getSidebar } = (0, providers_1.useSidebar)();
    const { config: { breadcrumbOptions, baseUrl, basePath }, } = (0, providers_1.useSiteConfig)();
    const getLinkPath = (item) => {
        return item.isPathHref ? item.path : `#${item.path}`;
    };
    const breadcrumbItems = (0, react_1.useMemo)(() => {
        const items = [];
        if (breadcrumbOptions?.startItems) {
            items.push(...breadcrumbOptions.startItems);
        }
        sidebarHistory.forEach((sidebar_id) => {
            const sidebar = getSidebar(sidebar_id);
            if (!sidebar) {
                return;
            }
            const sidebarFirstChild = getSidebarFirstLinkChild(sidebar);
            if (!sidebarFirstChild) {
                return;
            }
            items.push({
                title: sidebar.title,
                link: getLinkPath(sidebarFirstChild),
            });
        });
        return items;
    }, [sidebarHistory, breadcrumbOptions]);
    const jsonLd = (0, react_1.useMemo)(() => {
        const baseLink = `${baseUrl}${basePath}`.replace(/\/+$/, "");
        return (0, utils_1.getJsonLd)({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.title,
                item: item.link.startsWith("#")
                    ? baseLink
                    : item.link.startsWith("/")
                        ? `${baseLink}${item.link}`
                        : item.link,
            })),
        });
    }, [breadcrumbItems, baseUrl, basePath]);
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex items-center gap-docs_0.25", "text-medusa-fg-muted text-compact-small", "mb-docs_1 flex-wrap") },
        breadcrumbItems.map(({ title, link }, index) => (react_1.default.createElement(react_1.default.Fragment, { key: link },
            index > 0 && react_1.default.createElement(icons_1.TriangleRightMini, null),
            react_1.default.createElement(Button_1.Button, { variant: "transparent-clear", className: (0, clsx_1.default)("px-docs_0.5 py-docs_0.25", link === "#" && "hover:cursor-default", "!p-0 hover:!bg-transparent hover:!text-medusa-fg-subtle") },
                react_1.default.createElement(link_1.default, { href: link, className: (0, clsx_1.default)(link === "#" && "hover:cursor-default") }, title))))),
        react_1.default.createElement("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
                __html: jsonLd,
            } })));
};
exports.Breadcrumbs = Breadcrumbs;
