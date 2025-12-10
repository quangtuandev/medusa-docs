import React from "react";
import { ApiRunnerParamInput } from "./Default";
export const ApiRunnerParamInputs = ({ data, title, baseObjPath, setValue, }) => {
    return (React.createElement("div", { className: "flex flex-col gap-docs_0.25 w-full" },
        React.createElement("span", { className: "txt-small-plus text-medusa-fg-base" }, title),
        React.createElement("div", { className: "flex flex-col gap-docs_0.5" }, Object.keys(data).map((pathParam, index) => (React.createElement(ApiRunnerParamInput, { paramName: pathParam, paramValue: data[pathParam], objPath: baseObjPath, setValue: setValue, key: index }))))));
};
