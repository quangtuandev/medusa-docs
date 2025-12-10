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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechArticleJsonLd = void 0;
const react_1 = __importStar(require("react"));
const providers_1 = require("../../providers");
const utils_1 = require("../../utils");
const navigation_1 = require("next/navigation");
const TechArticleJsonLd = () => {
    const { config: { baseUrl, basePath, description: configDescription, titleSuffix }, frontmatter, } = (0, providers_1.useSiteConfig)();
    const pathname = (0, navigation_1.usePathname)();
    const { isBrowser } = (0, providers_1.useIsBrowser)();
    const [jsonLdData, setJsonLdData] = (0, react_1.useState)("{}");
    (0, react_1.useEffect)(() => {
        if (!isBrowser) {
            return;
        }
        // Use a small delay to ensure the document has been updated after navigation
        const updateJsonLd = () => {
            const baseLink = `${baseUrl}${basePath}`.replace(/\/+$/, "");
            const title = document.title.replace(` - ${titleSuffix}`, "");
            const description = document.querySelector("#main p")?.textContent ||
                configDescription ||
                "";
            const data = (0, utils_1.getJsonLd)({
                "@context": "https://schema.org",
                "@type": "TechArticle",
                headline: title,
                description,
                proficiencyLevel: "Expert",
                author: "Medusa",
                genre: "Documentation",
                keywords: frontmatter.keywords?.join(", ") || "medusa, ecommerce, open-source",
                url: `${baseLink}${pathname}`,
            });
            setJsonLdData(data);
        };
        // Update immediately
        updateJsonLd();
        // Also set up a MutationObserver to watch for title changes
        const titleObserver = new MutationObserver(() => {
            updateJsonLd();
        });
        const titleElement = document.querySelector("title");
        if (titleElement) {
            titleObserver.observe(titleElement, {
                childList: true,
                characterData: true,
                subtree: true,
            });
        }
        return () => {
            titleObserver.disconnect();
        };
    }, [isBrowser, pathname, baseUrl, basePath, configDescription, titleSuffix]);
    return (react_1.default.createElement("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: jsonLdData } }));
};
exports.TechArticleJsonLd = TechArticleJsonLd;
