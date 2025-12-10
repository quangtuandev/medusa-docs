"use client";
import React, { useEffect, useState } from "react";
import { ApiRunnerParamInput } from "../Default";
import clsx from "clsx";
import setObjValue from "../../../../utils/set-obj-value";
import { Button } from "../../../..";
import { Minus, Plus } from "@medusajs/icons";
export const ApiRunnerParamArrayInput = ({ paramName, paramValue, objPath, setValue, }) => {
    const [itemsValue, setItemsValue] = useState(paramValue);
    useEffect(() => {
        setValue((prev) => {
            return typeof prev === "object"
                ? setObjValue({
                    obj: { ...prev },
                    value: itemsValue,
                    path: `${objPath.length ? `${objPath}.` : ""}${paramName}`,
                })
                : itemsValue;
        });
    }, [itemsValue]);
    if (!Array.isArray(paramValue)) {
        return (React.createElement(ApiRunnerParamInput, { paramName: paramName, paramValue: paramValue, objPath: objPath, setValue: setValue }));
    }
    return (React.createElement("fieldset", { className: clsx("border border-medusa-border-strong rounded", "p-docs_0.5") },
        React.createElement("legend", { className: "px-docs_0.5" },
            React.createElement("code", null, paramName),
            " Array Items"),
        itemsValue.map((value, index) => (React.createElement("div", { key: index, className: clsx(index > 0 &&
                "flex gap-docs_0.5 items-center justify-center mt-docs_0.5") },
            React.createElement(ApiRunnerParamInput, { paramName: `[${index}]`, paramValue: value, objPath: "", setValue: setItemsValue }),
            index > 0 && (React.createElement(Button, { buttonType: "icon", variant: "secondary", onClick: () => {
                    setItemsValue((prev) => prev.splice(index, 1));
                }, className: "mt-0.5" },
                React.createElement(Minus, null)))))),
        React.createElement(Button, { buttonType: "icon", variant: "secondary", onClick: () => {
                setItemsValue((prev) => [
                    ...prev,
                    Array.isArray(prev[0])
                        ? [...prev[0]]
                        : typeof prev[0] === "object"
                            ? Object.assign({}, prev[0])
                            : prev[0],
                ]);
            }, className: "mt-0.5" },
            React.createElement(Plus, null))));
};
