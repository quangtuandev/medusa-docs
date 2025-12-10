import React from "react";
import clsx from "clsx";
export const InlineIcon = ({ Icon, alt, ...props }) => {
    return (React.createElement(Icon, { ...props, className: clsx("text-medusa-fg-subtle inline-block align-middle", props.className), "aria-label": alt }));
};
