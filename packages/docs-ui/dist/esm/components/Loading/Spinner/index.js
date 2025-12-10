import React from "react";
import clsx from "clsx";
import { Spinner } from "@medusajs/icons";
export const SpinnerLoading = ({ iconProps }) => {
    return (React.createElement("span", { role: "status" },
        React.createElement(Spinner, { ...iconProps, className: clsx("animate-spin", iconProps?.className) })));
};
