import React from "react";
import { ApiRunnerParamInput } from "../Default";
import clsx from "clsx";
export const ApiRunnerParamObjectInput = ({ paramName, paramValue, objPath, ...props }) => {
    if (typeof paramValue !== "object") {
        return (React.createElement(ApiRunnerParamInput, { paramName: paramName, paramValue: paramValue, objPath: objPath, ...props }));
    }
    return (React.createElement("fieldset", { className: clsx("border border-medusa-border-strong rounded", "p-docs_0.5") },
        React.createElement("legend", { className: "px-docs_0.5" },
            React.createElement("code", null, paramName),
            " Properties"),
        Object.entries(paramValue).map(([key, value], index) => (React.createElement(ApiRunnerParamInput, { paramName: key, paramValue: value, objPath: `${objPath.length ? `${objPath}.` : ""}${paramName}`, key: index, ...props })))));
};
