import clsx from "clsx";
import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
export const BareboneLayout = ({ htmlClassName, children, gaId, }) => {
    return (React.createElement("html", { lang: "en", className: clsx("h-full w-full", htmlClassName) },
        React.createElement("head", null),
        children,
        React.createElement(GoogleAnalytics, { gaId: gaId || "temp" })));
};
