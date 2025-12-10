import React from "react";
import clsx from "clsx";
import Image from "next/image";
export const BorderedIcon = ({ icon = "", IconComponent = null, iconWrapperClassName, iconClassName, iconColorClassName = "", wrapperClassName, iconWidth = 28, iconHeight = 28, }) => {
    return (React.createElement("span", { className: clsx("rounded-docs_sm p-docs_0.125 bg-medusa-bg-base inline-flex items-center justify-center", "shadow-border-base dark:shadow-border-base-dark", iconWrapperClassName) },
        React.createElement("span", { className: clsx("rounded-docs_xs", wrapperClassName) },
            !IconComponent && (React.createElement(Image, { src: icon || "", className: clsx(iconClassName, "bordered-icon rounded-docs_xs"), width: iconWidth, height: iconHeight, alt: "" })),
            IconComponent && (React.createElement(IconComponent, { className: clsx("text-medusa-fg-subtle rounded-docs_xs", iconClassName, "bordered-icon", iconColorClassName) })))));
};
