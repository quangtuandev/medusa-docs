"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerticalCodeTabs = void 0;
const react_1 = __importDefault(require("react"));
const CodeBlock_1 = require("../CodeBlock");
const clsx_1 = __importDefault(require("clsx"));
const VerticalCodeTabs = ({ tabs, className, selectedTabIndex, setSelectedTabIndex, }) => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("rounded-[20px] bg-medusa-bg-subtle p-docs_0.5", "shadow-elevation-modal dark:shadow-elevation-modal-dark", className) },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("rounded-docs_lg bg-medusa-contrast-bg-base h-full", "shadow-elevation-code-block dark:shadow-elevation-code-block-dark", "flex flex-col") },
            react_1.default.createElement("div", { className: (0, clsx_1.default)("px-docs_1 py-docs_0.75", "flex gap-[6px] items-center") }, new Array(3).fill(0).map((_, index) => (react_1.default.createElement("span", { className: (0, clsx_1.default)("inline-block rounded-full w-[10px] h-[10px]", "bg-medusa-contrast-border-bot border border-medusa-contrast-border-bot"), key: index })))),
            react_1.default.createElement("div", { className: (0, clsx_1.default)("flex flex-1 gap-[6px] items-start px-[5px] pb-[5px]") },
                react_1.default.createElement("ul", { className: "2xl:w-[180px] flex flex-col gap-[6px] shrink-0" }, tabs.map((tab, index) => (react_1.default.createElement("li", { className: (0, clsx_1.default)("px-docs_0.75 py-[11px]", "rounded-docs_DEFAULT border border-medusa-contrast-border-bot", "text-code-body font-monospace cursor-pointer", selectedTabIndex === index &&
                        "text-medusa-contrast-fg-primary bg-medusa-contrast-border-bot", selectedTabIndex !== index &&
                        "text-medusa-contrast-fg-secondary bg-medusa-contrast-bg-subtle hover:bg-medusa-contrast-border-bot"), onClick: () => setSelectedTabIndex(index), key: index }, tab.title)))),
                react_1.default.createElement("div", { className: "flex-1 h-[388px] max-w-full overflow-hidden rounded-docs_DEFAULT [&_pre]:min-h-full" },
                    react_1.default.createElement(CodeBlock_1.CodeBlock, { ...tabs[selectedTabIndex].code, noCopy: true, noReport: true, noAskAi: true, forceNoTitle: true, wrapperClassName: "h-full !rounded-docs_DEFAULT", className: (0, clsx_1.default)("overflow-auto h-full max-h-full !mb-0 !rounded-docs_DEFAULT", "!border !border-medusa-contrast-border-bot"), innerClassName: "h-full", animateTokenHighlights: true, overrideColors: {
                            bg: "bg-medusa-contrast-bg-subtle",
                            innerBg: "bg-medusa-contrast-bg-subtle",
                            lineNumbersBg: "bg-medusa-contrast-bg-subtle",
                            boxShadow: "shadow-none",
                        } }))))));
};
exports.VerticalCodeTabs = VerticalCodeTabs;
