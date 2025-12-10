"use client";
import React, { useMemo } from "react";
import { useSiteConfig } from "../../../providers";
import { products } from "../../../constants";
import { BorderedIcon } from "../../BorderedIcon";
import clsx from "clsx";
export const ContentMenuProducts = () => {
    const { frontmatter, config } = useSiteConfig();
    const loadedProducts = useMemo(() => {
        return frontmatter.products
            ?.sort()
            .map((product) => {
            return products.find((p) => p.name.toLowerCase() === product.toLowerCase());
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
    return (React.createElement("div", { className: "flex flex-col gap-docs_0.5" },
        React.createElement("span", { className: "text-x-small-plus text-medusa-fg-muted" }, "Modules used"),
        loadedProducts.map((product, index) => (React.createElement("a", { key: index, href: getProductUrl(product), className: "flex gap-docs_0.5 items-center group" },
            React.createElement(BorderedIcon, { wrapperClassName: clsx("bg-medusa-bg-base"), icon: getProductImageUrl(product), iconWidth: 16, iconHeight: 16 }),
            React.createElement("span", { className: "text-medusa-fg-subtle text-x-small-plus group-hover:text-medusa-fg-base transition-colors" }, product.title))))));
};
