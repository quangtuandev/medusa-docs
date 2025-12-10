"use strict";
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
exports.CodeBlockLine = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../../components");
const CodeBlockLine = ({ line, highlights = [], lineNumber, getLineProps, getTokenProps, showLineNumber, lineNumberColorClassName, lineNumberBgClassName, isTerminal, animateTokenHighlights = false, }) => {
    const lineProps = getLineProps({ line, key: lineNumber });
    // collect highlighted tokens, if there are any
    const highlightedTokens = (0, react_1.useMemo)(() => {
        const highlightedTokensArr = [];
        highlights.forEach((highlight) => {
            if (!highlight.text) {
                return;
            }
            let startIndex = undefined;
            let currentPositionInHighlightedText = 0;
            let endIndex = 0;
            const found = line.some((token, tokenIndex) => {
                if (token.empty || !token.content.length) {
                    startIndex = undefined;
                    currentPositionInHighlightedText = 0;
                    return false;
                }
                const startNotSet = startIndex === undefined;
                // trim the start of the script if the start
                // of the highlight hasn't been found yet
                const tokenContent = startNotSet
                    ? token.content.trimStart()
                    : token.content;
                if (!tokenContent.length && startNotSet) {
                    return false;
                }
                const comparisonLength = Math.min(tokenContent.length, highlight.text.substring(currentPositionInHighlightedText).length);
                const nextPositionInHighlightedText = currentPositionInHighlightedText + comparisonLength;
                const canHighlight = !highlightedTokensArr.length ||
                    !highlightedTokensArr.some((token) => tokenIndex >= token.start && tokenIndex <= token.end);
                const isMatching = tokenContent.substring(0, comparisonLength) ===
                    highlight.text?.substring(currentPositionInHighlightedText, nextPositionInHighlightedText);
                if (isMatching && canHighlight) {
                    if (startNotSet) {
                        startIndex = tokenIndex;
                    }
                    currentPositionInHighlightedText = nextPositionInHighlightedText;
                }
                if (currentPositionInHighlightedText === highlight.text.length) {
                    // matching text was found, break loop
                    endIndex = tokenIndex;
                    const trimmedContent = token.content.trimEnd();
                    const endingSpacesLength = token.content.length - trimmedContent.length;
                    if (endingSpacesLength) {
                        line.splice(tokenIndex + 1, 0, {
                            content: new Array(endingSpacesLength).fill(" ").join(""),
                            types: ["plain"],
                        });
                        token.content = trimmedContent;
                    }
                    return true;
                }
            });
            if (found && startIndex !== undefined) {
                highlightedTokensArr.push({
                    start: startIndex,
                    end: endIndex,
                    highlight,
                });
            }
        });
        // sort highlighted tokens by their start position
        highlightedTokensArr.sort((tokensA, tokensB) => {
            if (tokensA.start < tokensB.start) {
                return -1;
            }
            return tokensA.start > tokensB.start ? 1 : 0;
        });
        return highlightedTokensArr;
    }, [highlights, line]);
    // if there are highlighted tokens, split tokens in the
    // line by segments of not highlighted and highlighted token
    // if there are no highlighted tokens, the line is used as-is.
    const transformedLine = (0, react_1.useMemo)(() => {
        if (!highlightedTokens.length) {
            return [
                {
                    tokens: line,
                    type: "default",
                },
            ];
        }
        const transformedLineArr = [];
        let lastIndex = 0;
        // go through highlighted tokens to add the segments before/after to the
        // transformLineArr array
        highlightedTokens.forEach((highlightedTokensItem, index) => {
            if (lastIndex < highlightedTokensItem.start) {
                transformedLineArr.push({
                    tokens: line.slice(lastIndex, highlightedTokensItem.start),
                    type: "default",
                });
            }
            // check if the start text should be trimmed
            const token = Object.assign({}, line[highlightedTokensItem.start]);
            if (token.content.startsWith(" ") &&
                !highlightedTokensItem.highlight.text?.startsWith(" ")) {
                const originalLength = token.content.length;
                token.content = token.content.trimStart();
                // push the spaces as a separate token
                // so that they won't be highlighted.
                transformedLineArr.push({
                    tokens: [
                        {
                            content: " ".repeat(originalLength - token.content.length),
                            types: ["plain"],
                        },
                    ],
                    type: "default",
                });
            }
            transformedLineArr.push({
                tokens: [
                    token,
                    ...line.slice(highlightedTokensItem.start + 1, highlightedTokensItem.end + 1),
                ],
                type: "highlighted",
                highlight: highlightedTokensItem.highlight,
            });
            lastIndex = highlightedTokensItem.end + 1;
            // if this is the last item in `highlightedTokens` and
            // its end index is less than the line's length, that means
            // there are tokens at the end of the line that aren't highlighted
            // and should be pushed as-is to the `transformLineArr` array.
            if (index === highlightedTokens.length - 1 &&
                lastIndex < line.length - 1) {
                transformedLineArr.push({
                    tokens: line.slice(lastIndex),
                    type: "default",
                });
            }
        });
        return transformedLineArr;
    }, [highlightedTokens]);
    const getTokensElm = ({ tokens, isTokenHighlighted, offset, }) => (react_1.default.createElement("span", { className: (0, clsx_1.default)(isTokenHighlighted && "relative") },
        isTokenHighlighted && (react_1.default.createElement("span", { className: (0, clsx_1.default)(animateTokenHighlights && [
                "animate-fast animate-growWidth animation-fill-forwards",
            ], !animateTokenHighlights && "w-full", "absolute left-0 top-0 h-full z-0", "lg:bg-medusa-alpha-white-alpha-6 lg:border lg:border-medusa-alpha-white-alpha-12", "lg:rounded-docs_xs scale-x-[1.05]") })),
        tokens.map((token, key) => {
            const tokenKey = offset + key;
            const { className: tokenClassName, ...rest } = getTokenProps({
                token,
                key: tokenKey,
            });
            return (react_1.default.createElement("span", { key: tokenKey, className: (0, clsx_1.default)(tokenClassName, isTokenHighlighted && "relative z-[1]"), ...rest }));
        })));
    const isHighlightedLine = (0, react_1.useMemo)(() => highlights.length !== 0 && highlightedTokens.length === 0, [highlights, highlightedTokens]);
    return (react_1.default.createElement("span", { key: lineNumber, ...lineProps, className: (0, clsx_1.default)("table-row", isHighlightedLine && "bg-medusa-alpha-white-alpha-6", lineProps.className) },
        (showLineNumber || isTerminal) && (react_1.default.createElement("span", { className: (0, clsx_1.default)("mr-docs_1 table-cell select-none", "sticky left-0 w-[1%] px-docs_1 text-right", lineNumberColorClassName, lineNumberBgClassName) }, isTerminal ? "❯" : showLineNumber ? lineNumber + 1 : "")),
        react_1.default.createElement("span", null, transformedLine.map(({ tokens, type, highlight }, index) => {
            const offset = index === 0 ? 0 : transformedLine[index - 1].tokens.length;
            const tooltipText = highlight?.tooltipText ||
                (isHighlightedLine
                    ? highlights.find((h) => h.tooltipText !== undefined)?.tooltipText
                    : undefined);
            const isHighlighted = type === "highlighted";
            return (react_1.default.createElement(react_1.default.Fragment, { key: index },
                tooltipText && (react_1.default.createElement(components_1.Tooltip, { text: tooltipText, tooltipClassName: "font-base", render: ({ content }) => (react_1.default.createElement(components_1.MarkdownContent, { allowedElements: ["a", "strong", "code", "br"], unwrapDisallowed: true }, content || "")) }, getTokensElm({
                    tokens,
                    isTokenHighlighted: isHighlighted,
                    offset,
                }))),
                !tooltipText &&
                    getTokensElm({
                        tokens,
                        isTokenHighlighted: isHighlighted,
                        offset,
                    })));
        }))));
};
exports.CodeBlockLine = CodeBlockLine;
