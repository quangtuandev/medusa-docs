import clsx from "clsx";
import React, { Suspense, lazy } from "react";
import { Loading } from "../../components";
const TypeListItems = lazy(async () => import("./Items"));
export const TypeList = ({ types, className, sectionTitle, expandUrl, openedLevel, ...props }) => {
    return (React.createElement("div", { className: clsx("bg-medusa-bg-subtle rounded my-docs_1", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", className), ...props },
        React.createElement(Suspense, { fallback: React.createElement(Loading, null) },
            React.createElement(TypeListItems, { types: types, expandUrl: expandUrl, sectionTitle: sectionTitle, openedLevel: openedLevel }))));
};
