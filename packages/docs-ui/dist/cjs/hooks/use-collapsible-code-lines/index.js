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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCollapsibleCodeLines = void 0;
const react_1 = __importStar(require("react"));
const Lines_1 = require("../../components/CodeBlock/Collapsible/Lines");
const use_collapsible_1 = require("../use-collapsible");
const useCollapsibleCodeLines = ({ collapsibleLinesStr, getLines, }) => {
    const collapsedRange = (0, react_1.useMemo)(() => {
        if (!collapsibleLinesStr) {
            return;
        }
        const splitCollapsedLines = collapsibleLinesStr
            .split("-")
            .map((lineNumber) => parseInt(lineNumber));
        if (!splitCollapsedLines.length ||
            (splitCollapsedLines.length >= 2 &&
                splitCollapsedLines[0] !== 1 &&
                splitCollapsedLines[1] < 2)) {
            return;
        }
        return {
            start: splitCollapsedLines[0],
            end: splitCollapsedLines[1],
        };
    }, [collapsibleLinesStr]);
    const isCollapsible = (0, react_1.useCallback)((tokens) => {
        return collapsedRange && collapsedRange.start < tokens.length;
    }, [collapsedRange]);
    const type = (0, react_1.useMemo)(() => {
        if (!collapsedRange) {
            return undefined;
        }
        return collapsedRange.start === 1 ? "start" : "end";
    }, [collapsedRange]);
    const ref = (0, react_1.useRef)(null);
    const collapsibleHookResult = (0, use_collapsible_1.useCollapsible)({
        unmountOnExit: false,
        translateEnabled: false,
        heightAnimation: true,
        childrenRef: ref,
    });
    const getCollapsedLinesElm = (0, react_1.useCallback)(({ tokens, highlightProps, }) => {
        if (!collapsedRange || !type || !isCollapsible(tokens)) {
            return react_1.default.createElement(react_1.default.Fragment, null);
        }
        const startIndex = type === "start" ? collapsedRange.start - 1 : collapsedRange.start;
        const lines = tokens.slice(startIndex, collapsedRange.end
            ? Math.min(collapsedRange.end, tokens.length)
            : tokens.length);
        return (react_1.default.createElement(Lines_1.CodeBlockCollapsibleLines, { ...collapsibleHookResult, type: type }, getLines(lines, highlightProps, startIndex)));
    }, [collapsedRange, collapsibleHookResult, isCollapsible, type]);
    const getNonCollapsedLinesElm = (0, react_1.useCallback)(({ tokens, highlightProps, }) => {
        if (!collapsedRange || !isCollapsible(tokens)) {
            return getLines(tokens, highlightProps);
        }
        const isCollapseBeginning = collapsedRange.start === 1;
        const lines = tokens.slice(isCollapseBeginning ? collapsedRange.end || tokens.length : 0, isCollapseBeginning ? undefined : collapsedRange.start);
        return getLines(lines, highlightProps, isCollapseBeginning ? collapsedRange.end : 0);
    }, [collapsedRange, collapsibleHookResult, isCollapsible]);
    return {
        getCollapsedLinesElm,
        getNonCollapsedLinesElm,
        type,
        isCollapsible,
        ...collapsibleHookResult,
    };
};
exports.useCollapsibleCodeLines = useCollapsibleCodeLines;
