"use client";
import { Text } from "@medusajs/ui";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { CodeBlock, MarkdownContent, Tooltip } from "../../..";
import { Bolt, InformationCircle } from "@medusajs/icons";
import { getBrowser } from "../../../../utils";
export const WorkflowDiagramStepNode = ({ step }) => {
    const stepId = step.name.split(".").pop();
    const [offset, setOffset] = useState(undefined);
    const ref = useRef(null);
    const description = useMemo(() => {
        return step.description?.replaceAll(/:::[a-z]*/g, "") || "";
    }, [step.description]);
    useEffect(() => {
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
        const browser = getBrowser();
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
    return (React.createElement(Tooltip, { tooltipClassName: "!text-left max-w-[300px] text-pretty overflow-scroll", tooltipChildren: React.createElement(React.Fragment, null,
            React.createElement("h4", { className: "text-compact-x-small-plus" }, step.name),
            description && (React.createElement(MarkdownContent, { allowedElements: ["a", "strong", "code"], unwrapDisallowed: true }, description)),
            step.when?.condition && (React.createElement(CodeBlock, { lang: "typescript", source: unindentLines(step.when.condition), noReport: true, noCopy: true, noAskAi: true, noLineNumbers: true, title: "when Condition", wrapperClassName: "mt-docs_0.5" }))), clickable: true, place: "right", offset: offset, ref: ref },
        React.createElement(Link, { href: step.link || `#${step.name.toLowerCase()}`, className: "focus-visible:shadow-borders-focus transition-fg rounded-docs_sm outline-none" },
            React.createElement("div", { className: clsx("shadow-borders-base flex w-fit bg-medusa-bg-base", "items-center rounded-docs_sm py-docs_0.125 px-docs_0.5", (step.type === "hook" || step.when) && "gap-x-docs_0.125"), "data-step-id": step.name },
                step.type === "hook" && (React.createElement("div", { className: "flex size-[20px] items-center justify-center text-medusa-tag-orange-icon" },
                    React.createElement(Bolt, null))),
                step.when && (React.createElement("div", { className: "flex size-[20px] items-center justify-center text-medusa-tag-green-icon" },
                    React.createElement(InformationCircle, null))),
                React.createElement(Text, { size: "xsmall", leading: "compact", weight: "plus", className: "select-none" }, stepId)))));
};
