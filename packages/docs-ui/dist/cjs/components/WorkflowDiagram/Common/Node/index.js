"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowDiagramStepNode = void 0;
const ui_1 = require("@medusajs/ui");
const clsx_1 = __importDefault(require("clsx"));
const link_1 = __importDefault(require("next/link"));
const react_1 = __importStar(require("react"));
const __1 = require("../../..");
const icons_1 = require("@medusajs/icons");
const utils_1 = require("../../../../utils");
const WorkflowDiagramStepNode = ({ step }) => {
    const stepId = step.name.split(".").pop();
    const [offset, setOffset] = (0, react_1.useState)(undefined);
    const ref = (0, react_1.useRef)(null);
    const description = (0, react_1.useMemo)(() => {
        return step.description?.replaceAll(/:::[a-z]*/g, "") || "";
    }, [step.description]);
    (0, react_1.useEffect)(() => {
        if (!ref.current) {
            return;
        }
        // find parent
        const diagramParent = ref.current.closest(".workflow-list-diagram");
        const nodeParent = ref.current.closest(".workflow-node-group");
        if (!diagramParent || !nodeParent) {
            return;
        }
        const firstChild = nodeParent.firstChild;
        const nodeBoundingRect = nodeParent.getBoundingClientRect();
        const diagramBoundingRect = diagramParent.getBoundingClientRect();
        const browser = (0, utils_1.getBrowser)();
        if (browser === "Safari") {
            // React Tooltip has a bug in Safari where the offset is not calculated correctly
            // when place is set.
            const firstChildBoundingRect = firstChild.getBoundingClientRect();
            setOffset(diagramBoundingRect.width - firstChildBoundingRect.width + 20);
        }
        else {
            setOffset(Math.max(diagramBoundingRect.width - nodeBoundingRect.width + 10, 10));
        }
    }, [ref.current]);
    const unindentLines = (str) => {
        let minIndent = 4;
        return str
            .split("\n")
            .reverse()
            .map((line, index) => {
            const trimmedStartLine = line.trimStart();
            const numberOfSpaces = line.length - trimmedStartLine.length;
            if (index === 0) {
                minIndent = numberOfSpaces || minIndent;
            }
            if (numberOfSpaces >= minIndent) {
                return " ".repeat(numberOfSpaces - 4) + trimmedStartLine;
            }
            return line;
        })
            .reverse()
            .join("\n");
    };
    return (react_1.default.createElement(__1.Tooltip, { tooltipClassName: "!text-left max-w-[300px] text-pretty overflow-scroll", tooltipChildren: react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("h4", { className: "text-compact-x-small-plus" }, step.name),
            description && (react_1.default.createElement(__1.MarkdownContent, { allowedElements: ["a", "strong", "code"], unwrapDisallowed: true }, description)),
            step.when?.condition && (react_1.default.createElement(__1.CodeBlock, { lang: "typescript", source: unindentLines(step.when.condition), noReport: true, noCopy: true, noAskAi: true, noLineNumbers: true, title: "when Condition", wrapperClassName: "mt-docs_0.5" }))), clickable: true, place: "right", offset: offset, ref: ref },
        react_1.default.createElement(link_1.default, { href: step.link || `#${step.name.toLowerCase()}`, className: "focus-visible:shadow-borders-focus transition-fg rounded-docs_sm outline-none" },
            react_1.default.createElement("div", { className: (0, clsx_1.default)("shadow-borders-base flex w-fit bg-medusa-bg-base", "items-center rounded-docs_sm py-docs_0.125 px-docs_0.5", (step.type === "hook" || step.when) && "gap-x-docs_0.125"), "data-step-id": step.name },
                step.type === "hook" && (react_1.default.createElement("div", { className: "flex size-[20px] items-center justify-center text-medusa-tag-orange-icon" },
                    react_1.default.createElement(icons_1.Bolt, null))),
                step.when && (react_1.default.createElement("div", { className: "flex size-[20px] items-center justify-center text-medusa-tag-green-icon" },
                    react_1.default.createElement(icons_1.InformationCircle, null))),
                react_1.default.createElement(ui_1.Text, { size: "xsmall", leading: "compact", weight: "plus", className: "select-none" }, stepId)))));
};
exports.WorkflowDiagramStepNode = WorkflowDiagramStepNode;
