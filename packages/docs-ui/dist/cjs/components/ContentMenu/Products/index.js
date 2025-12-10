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
exports.ContentMenuProducts = void 0;
const react_1 = __importStar(require("react"));
const providers_1 = require("../../../providers");
const constants_1 = require("../../../constants");
const BorderedIcon_1 = require("../../BorderedIcon");
const clsx_1 = __importDefault(require("clsx"));
const ContentMenuProducts = () => {
    const { frontmatter, config } = (0, providers_1.useSiteConfig)();
    const loadedProducts = (0, react_1.useMemo)(() => {
        return frontmatter.products
            ?.sort()
            .map((product) => {
            return constants_1.products.find((p) => p.name.toLowerCase() === product.toLowerCase());
        })
            .filter(Boolean);
    }, [frontmatter.products]);
    if (!loadedProducts?.length) {
        return null;
    }
    const getProductUrl = (product) => {
        return `${config.baseUrl}${product.path}`;
    };
    const getProductImageUrl = (product) => {
        return `${config.basePath}${product.image}`;
    };
    return (react_1.default.createElement("div", { className: "flex flex-col gap-docs_0.5" },
        react_1.default.createElement("span", { className: "text-x-small-plus text-medusa-fg-muted" }, "Modules used"),
        loadedProducts.map((product, index) => (react_1.default.createElement("a", { key: index, href: getProductUrl(product), className: "flex gap-docs_0.5 items-center group" },
            react_1.default.createElement(BorderedIcon_1.BorderedIcon, { wrapperClassName: (0, clsx_1.default)("bg-medusa-bg-base"), icon: getProductImageUrl(product), iconWidth: 16, iconHeight: 16 }),
            react_1.default.createElement("span", { className: "text-medusa-fg-subtle text-x-small-plus group-hover:text-medusa-fg-base transition-colors" }, product.title))))));
};
exports.ContentMenuProducts = ContentMenuProducts;
