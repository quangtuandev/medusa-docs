import React from "react";
import clsx from "clsx";
export const WideSection = ({ children, className, as = "div", }) => {
    const Component = as;
    return (React.createElement(Component, { className: clsx("max-w-inner-content-xs sm:max-w-inner-content-sm md:max-w-inner-content-md", "lg:max-w-lg-wide-content xl:max-w-xl-wide-content px-1 lg:px-0 mx-auto", className) }, children));
};
