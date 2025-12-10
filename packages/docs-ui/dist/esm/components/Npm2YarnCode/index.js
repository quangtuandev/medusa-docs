import React from "react";
import { CodeBlock, CodeTab, CodeTabs } from "../..";
import convert from "npm-to-yarn";
export const Npm2YarnCode = ({ npmCode, ...codeOptions }) => {
    // convert npm code
    const yarnCode = convert(npmCode, "yarn").replaceAll(/([^\s])&&/g, "$1 &&");
    const pnpmCode = convert(npmCode, "pnpm").replaceAll(/([^\s])&&/g, "$1 &&");
    const lang = "bash";
    codeOptions.hasTabs = true;
    const tabs = [
        {
            label: "npm",
            value: "npm",
            code: {
                source: npmCode,
                lang,
                ...codeOptions,
            },
        },
        {
            label: "yarn",
            value: "yarn",
            code: {
                source: yarnCode,
                lang,
                ...codeOptions,
            },
        },
        {
            label: "pnpm",
            value: "pnpm",
            code: {
                source: pnpmCode,
                lang,
                ...codeOptions,
            },
        },
    ];
    return (React.createElement(CodeTabs, { group: "npm2yarn" }, tabs.map((tab, index) => (React.createElement(CodeTab, { label: tab.label, value: tab.value, key: index },
        React.createElement(CodeBlock, { ...tab.code }))))));
};
