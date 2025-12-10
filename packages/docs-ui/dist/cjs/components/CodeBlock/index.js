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
exports.CodeBlock = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const prism_react_renderer_1 = require("prism-react-renderer");
const components_1 = require("../../components");
const providers_1 = require("../../providers");
const Header_1 = require("./Header");
const Line_1 = require("./Line");
// @ts-expect-error can't install the types package because it doesn't support React v19
const react_transition_group_1 = require("react-transition-group");
const __1 = require("../..");
const Actions_1 = require("./Actions");
const Button_1 = require("./Collapsible/Button");
const Fade_1 = require("./Collapsible/Fade");
const Inline_1 = require("./Inline");
const CodeBlock = ({ source, hasTabs = false, lang = "", wrapperClassName, innerClassName, className, overrideColors = {}, collapsed = false, title = "", highlights = [], apiTesting = false, blockStyle = "loud", noCopy = false, noReport = false, noLineNumbers = false, children, collapsibleLines, expandButtonLabel, isTerminal, style, forceNoTitle = false, animateTokenHighlights, noAskAi = false, ...rest }) => {
    if (!source && typeof children === "string") {
        source = children;
    }
    if (blockStyle === "inline") {
        return react_1.default.createElement(Inline_1.CodeBlockInline, { source: source });
    }
    const { colorMode } = (0, providers_1.useColorMode)();
    const { track } = (0, providers_1.useAnalytics)();
    const [showTesting, setShowTesting] = (0, react_1.useState)(false);
    const codeContainerRef = (0, react_1.useRef)(null);
    const codeRef = (0, react_1.useRef)(null);
    const apiRunnerRef = (0, react_1.useRef)(null);
    const [scrollable, setScrollable] = (0, react_1.useState)(false);
    const isTerminalCode = (0, react_1.useMemo)(() => {
        return isTerminal === undefined
            ? lang === "bash" && !source.startsWith("curl")
            : isTerminal;
    }, [isTerminal, lang]);
    const codeTitle = (0, react_1.useMemo)(() => {
        if (forceNoTitle) {
            return "";
        }
        if (title) {
            return title;
        }
        if (hasTabs) {
            return "";
        }
        if (isTerminalCode) {
            return "Terminal";
        }
        return "Code";
    }, [title, isTerminalCode, hasTabs, forceNoTitle]);
    const hasInnerCodeBlock = (0, react_1.useMemo)(() => hasTabs || codeTitle.length > 0, [hasTabs, codeTitle]);
    const canShowApiTesting = (0, react_1.useMemo)(() => apiTesting !== undefined &&
        rest.testApiMethod !== undefined &&
        rest.testApiUrl !== undefined, [apiTesting, rest]);
    const bgColor = (0, react_1.useMemo)(() => (0, clsx_1.default)(overrideColors.bg, !overrideColors.bg && [
        blockStyle === "loud" && "bg-medusa-contrast-bg-base",
        blockStyle === "subtle" && [
            colorMode === "light" && "bg-medusa-bg-subtle",
            colorMode === "dark" && "bg-medusa-code-bg-base",
        ],
    ]), [blockStyle, colorMode, overrideColors]);
    const lineNumbersColor = (0, react_1.useMemo)(() => (0, clsx_1.default)(overrideColors.lineNumbersBg, !overrideColors.lineNumbersBg && [
        blockStyle === "loud" && "text-medusa-contrast-fg-secondary",
        blockStyle === "subtle" && [
            colorMode === "light" && "text-medusa-fg-muted",
            colorMode === "dark" && "text-medusa-contrast-fg-secondary",
        ],
    ]), [blockStyle, colorMode, overrideColors]);
    const borderColor = (0, react_1.useMemo)(() => (0, clsx_1.default)(overrideColors.border, !overrideColors.border && [
        blockStyle === "loud" && "border-0",
        blockStyle === "subtle" && [
            colorMode === "light" && "border-medusa-border-base",
            colorMode === "dark" && "border-medusa-code-border",
        ],
    ]), [blockStyle, colorMode, overrideColors]);
    const boxShadow = (0, react_1.useMemo)(() => (0, clsx_1.default)(overrideColors.boxShadow, !overrideColors.boxShadow && [
        blockStyle === "loud" &&
            "shadow-elevation-code-block dark:shadow-elevation-code-block-dark",
        blockStyle === "subtle" && "shadow-none",
    ]), [blockStyle, overrideColors]);
    const innerBgColor = (0, react_1.useMemo)(() => (0, clsx_1.default)(overrideColors.innerBg, !overrideColors.innerBg && [
        blockStyle === "loud" && [
            hasInnerCodeBlock && "bg-medusa-contrast-bg-subtle",
            !hasInnerCodeBlock && "bg-medusa-contrast-bg-base",
        ],
        blockStyle === "subtle" && bgColor,
    ]), [blockStyle, bgColor, hasInnerCodeBlock, overrideColors]);
    const innerBorderClasses = (0, react_1.useMemo)(() => (0, clsx_1.default)(overrideColors.innerBorder, !overrideColors.innerBorder && [
        blockStyle === "loud" && [
            hasInnerCodeBlock &&
                "border border-solid border-medusa-contrast-border-bot rounded-docs_DEFAULT",
            !hasInnerCodeBlock && "border-transparent rounded-docs_DEFAULT",
        ],
        blockStyle === "subtle" && "border-transparent rounded-docs_DEFAULT",
    ]), [blockStyle, hasInnerCodeBlock, overrideColors]);
    const language = (0, react_1.useMemo)(() => {
        const lowerLang = lang.toLowerCase();
        // due to a hydration error in json, for now we just assign it to plain
        return lowerLang === "json" ? "plain" : lowerLang;
    }, [lang]);
    const transformedHighlights = highlights
        .filter((highlight) => highlight.length !== 0)
        .map((highlight) => ({
        line: parseInt(highlight[0]),
        text: highlight.length >= 2 ? highlight[1] : undefined,
        tooltipText: highlight.length >= 3 ? highlight[2] : undefined,
    }));
    const getLines = (tokens, highlightProps, lineNumberOffset = 0) => tokens.map((line, i) => {
        const offsettedLineNumber = i + lineNumberOffset;
        const highlightedLines = transformedHighlights.filter((highlight) => highlight.line - 1 === offsettedLineNumber);
        return (react_1.default.createElement(Line_1.CodeBlockLine, { line: line, lineNumber: offsettedLineNumber, highlights: highlightedLines, showLineNumber: !noLineNumbers && tokens.length > 1, key: offsettedLineNumber, lineNumberColorClassName: lineNumbersColor, lineNumberBgClassName: innerBgColor, isTerminal: isTerminalCode, animateTokenHighlights: animateTokenHighlights, ...highlightProps }));
    });
    const { getCollapsedLinesElm, getNonCollapsedLinesElm, type: collapsibleType, isCollapsible, ...collapsibleResult } = (0, __1.useCollapsibleCodeLines)({
        collapsibleLinesStr: collapsibleLines,
        getLines,
    });
    (0, react_1.useEffect)(() => {
        if (!codeContainerRef.current || !codeRef.current) {
            return;
        }
        setScrollable(codeContainerRef.current.scrollWidth < codeRef.current.clientWidth);
    }, [codeContainerRef.current, codeRef.current]);
    const trackCopy = () => {
        track({
            event: {
                event: __1.DocsTrackingEvents.CODE_BLOCK_COPY,
            },
        });
    };
    const actionsProps = (0, react_1.useMemo)(() => ({
        source,
        canShowApiTesting,
        onApiTesting: setShowTesting,
        blockStyle,
        noReport,
        noCopy,
        isCollapsed: collapsibleType !== undefined && collapsibleResult.collapsed,
        inInnerCode: hasInnerCodeBlock,
        showGradientBg: scrollable,
        noAskAi,
    }), [
        source,
        canShowApiTesting,
        setShowTesting,
        noReport,
        noCopy,
        collapsibleType,
        collapsibleResult,
        hasInnerCodeBlock,
        scrollable,
        noAskAi,
    ]);
    const codeTheme = (0, react_1.useMemo)(() => {
        const prismTheme = blockStyle === "loud" || colorMode === "dark"
            ? prism_react_renderer_1.themes.vsDark
            : prism_react_renderer_1.themes.vsLight;
        return {
            ...prismTheme,
            plain: {
                ...prismTheme,
                color: colorMode === "light"
                    ? "rgba(255, 255, 255, 0.88)"
                    : "rgba(250, 250, 250, 1)",
            },
        };
    }, [blockStyle, colorMode]);
    if (!source.length) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, clsx_1.default)(hasInnerCodeBlock && "rounded-docs_lg", !hasInnerCodeBlock && "rounded-docs_DEFAULT", !hasTabs && boxShadow, blockStyle === "loud" && "code-block-highlight", blockStyle === "subtle" &&
                colorMode === "light" &&
                "code-block-highlight-light", wrapperClassName) },
            codeTitle && (react_1.default.createElement(Header_1.CodeBlockHeader, { title: codeTitle, blockStyle: blockStyle, badgeLabel: rest.badgeLabel, badgeColor: rest.badgeColor, actionsProps: {
                    ...actionsProps,
                    inHeader: true,
                }, hideActions: hasTabs })),
            react_1.default.createElement("div", { className: (0, clsx_1.default)("relative mb-docs_1", "w-full max-w-full border code-block-elm", bgColor, borderColor, collapsed && "max-h-[400px] overflow-auto", hasInnerCodeBlock && "p-[5px] !pt-0 rounded-b-docs_lg", !hasInnerCodeBlock && "rounded-docs_DEFAULT", className), style: style },
                react_1.default.createElement(prism_react_renderer_1.Highlight, { theme: codeTheme, code: source.trim(), language: language, ...rest }, ({ className: preClassName, style: { backgroundColor: _, ...style }, tokens, ...rest }) => (react_1.default.createElement("div", { className: (0, clsx_1.default)(innerBorderClasses, innerBgColor, "relative", innerClassName), ref: codeContainerRef },
                    collapsibleType === "start" && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(Button_1.CodeBlockCollapsibleButton, { type: collapsibleType, expandButtonLabel: expandButtonLabel, className: innerBorderClasses, ...collapsibleResult }),
                        react_1.default.createElement(Fade_1.CodeBlockCollapsibleFade, { type: collapsibleType, collapsed: collapsibleResult.collapsed, hasHeader: hasInnerCodeBlock }))),
                    react_1.default.createElement("pre", { style: { ...style, fontStretch: "100%" }, className: (0, clsx_1.default)("relative !my-0 break-words bg-transparent !outline-none", "overflow-auto break-words p-0 pr-docs_0.25", "rounded-docs_DEFAULT", !hasInnerCodeBlock &&
                            tokens.length <= 1 &&
                            "px-docs_1 py-[6px]", (noLineNumbers ||
                            (tokens.length <= 1 && !isTerminalCode)) &&
                            "pl-docs_1", preClassName), onCopy: trackCopy },
                        react_1.default.createElement("code", { className: (0, clsx_1.default)("text-code-body font-monospace table min-w-full print:whitespace-pre-wrap", "py-docs_0.75"), ref: codeRef },
                            collapsibleType === "start" &&
                                getCollapsedLinesElm({
                                    tokens,
                                    highlightProps: rest,
                                }),
                            getNonCollapsedLinesElm({
                                tokens,
                                highlightProps: rest,
                            }),
                            collapsibleType === "end" &&
                                getCollapsedLinesElm({
                                    tokens,
                                    highlightProps: rest,
                                }))),
                    !hasInnerCodeBlock &&
                        (!noCopy || !noReport || canShowApiTesting || !noAskAi) && (react_1.default.createElement(Actions_1.CodeBlockActions, { ...actionsProps, inHeader: false, isSingleLine: tokens.length <= 1 })),
                    collapsibleType === "end" && isCollapsible(tokens) && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(Fade_1.CodeBlockCollapsibleFade, { type: collapsibleType, collapsed: collapsibleResult.collapsed, hasHeader: hasInnerCodeBlock }),
                        react_1.default.createElement(Button_1.CodeBlockCollapsibleButton, { type: collapsibleType, expandButtonLabel: expandButtonLabel, className: innerBorderClasses, ...collapsibleResult })))))))),
        canShowApiTesting && (react_1.default.createElement(react_transition_group_1.CSSTransition, { unmountOnExit: true, in: showTesting, timeout: 150, classNames: {
                enter: "animate-fadeIn animate-fastest",
                exit: "animate-fadeOut animate-fastest",
            }, nodeRef: apiRunnerRef },
            react_1.default.createElement(components_1.ApiRunner, { apiMethod: rest.testApiMethod, apiUrl: rest.testApiUrl, pathData: rest.testPathParams, bodyData: rest.testBodyParams, queryData: rest.testQueryParams, ref: apiRunnerRef })))));
};
exports.CodeBlock = CodeBlock;
