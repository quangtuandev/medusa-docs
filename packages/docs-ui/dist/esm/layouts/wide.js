import React from "react";
import { RootLayout } from "./root";
import clsx from "clsx";
import { Breadcrumbs } from "..";
export const WideLayout = ({ children, footerComponent, showBreadcrumbs = true, ...props }) => {
    return (React.createElement(RootLayout, { ...props, mainWrapperClasses: clsx(props.mainWrapperClasses, "mx-auto flex"), contentClassName: "w-full" },
        React.createElement("main", { className: clsx("relative mt-4 w-full flex-1 lg:mt-7") },
            showBreadcrumbs && React.createElement(Breadcrumbs, null),
            children,
            footerComponent)));
};
