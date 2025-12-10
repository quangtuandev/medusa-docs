"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Npm2YarnCode = void 0;
const react_1 = __importDefault(require("react"));
const __1 = require("../..");
const npm_to_yarn_1 = __importDefault(require("npm-to-yarn"));
const Npm2YarnCode = ({ npmCode, ...codeOptions }) => {
    // convert npm code
    const yarnCode = (0, npm_to_yarn_1.default)(npmCode, "yarn").replaceAll(/([^\s])&&/g, "$1 &&");
    const pnpmCode = (0, npm_to_yarn_1.default)(npmCode, "pnpm").replaceAll(/([^\s])&&/g, "$1 &&");
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
    return (react_1.default.createElement(__1.CodeTabs, { group: "npm2yarn" }, tabs.map((tab, index) => (react_1.default.createElement(__1.CodeTab, { label: tab.label, value: tab.value, key: index },
        react_1.default.createElement(__1.CodeBlock, { ...tab.code }))))));
};
exports.Npm2YarnCode = Npm2YarnCode;
