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
exports.CodeTabs = void 0;
const react_1 = __importStar(require("react"));
const __1 = require("../..");
const clsx_1 = __importDefault(require("clsx"));
const Actions_1 = require("../CodeBlock/Actions");
const Wrapper_1 = require("../CodeBlock/Header/Wrapper");
const CodeTabs = ({ children, className, group = "client", blockStyle = "loud", }) => {
    const { colorMode } = (0, __1.useColorMode)();
    const isCodeBlock = (node) => {
        if (!react_1.default.isValidElement(node)) {
            return false;
        }
        if (node.type === "pre") {
            return true;
        }
        const typedProps = node.props;
        return "source" in typedProps;
    };
    const getCodeBlockProps = (codeBlock) => {
        if (typeof codeBlock.props !== "object" || !codeBlock.props) {
            return undefined;
        }
        if ("source" in codeBlock.props) {
            return codeBlock.props;
        }
        if ("children" in codeBlock.props) {
            if (typeof codeBlock.props.children === "object" &&
                codeBlock.props.children) {
                return getCodeBlockProps(codeBlock.props.children);
            }
            else if (typeof codeBlock.props.children === "string") {
                const lang = "lang" in codeBlock.props ? codeBlock.props.lang : "ts";
                return {
                    ...codeBlock.props,
                    source: codeBlock.props.children,
                    className: "className" in codeBlock.props
                        ? codeBlock.props.className
                        : `language-${lang}`,
                };
            }
        }
        return undefined;
    };
    const tabs = (0, react_1.useMemo)(() => {
        const tempTabs = [];
        react_1.Children.forEach(children, (child) => {
            if (!react_1.default.isValidElement(child)) {
                return;
            }
            const typedChildProps = child.props;
            if (!typedChildProps.label ||
                !typedChildProps.value ||
                !react_1.default.isValidElement(typedChildProps.children)) {
                return;
            }
            const codeBlock = isCodeBlock(typedChildProps.children)
                ? typedChildProps.children
                : undefined;
            if (!codeBlock) {
                return;
            }
            let codeBlockProps = codeBlock.props;
            const showBadge = !codeBlockProps.title;
            const originalBadgeLabel = codeBlockProps.badgeLabel;
            const parsedCodeBlockProps = getCodeBlockProps(codeBlock) || {
                source: "",
            };
            const commonProps = {
                badgeLabel: showBadge ? undefined : originalBadgeLabel,
                hasTabs: true,
                className: (0, clsx_1.default)("!my-0", parsedCodeBlockProps.className),
            };
            if (typeof codeBlock.type !== "string" &&
                (("name" in codeBlock.type && codeBlock.type.name === "CodeBlock") ||
                    "source" in codeBlockProps)) {
                codeBlockProps = {
                    ...codeBlockProps,
                    ...commonProps,
                };
            }
            const modifiedProps = {
                ...parsedCodeBlockProps,
                ...commonProps,
            };
            tempTabs.push({
                label: typedChildProps.label,
                value: typedChildProps.value,
                codeProps: {
                    ...modifiedProps,
                    badgeLabel: !showBadge ? undefined : originalBadgeLabel,
                },
                codeBlock: {
                    ...codeBlock,
                    props: {
                        ...codeBlockProps,
                        children: {
                            ...(typeof codeBlockProps.children === "object"
                                ? codeBlockProps.children
                                : {}),
                            props: modifiedProps,
                        },
                    },
                },
            });
        });
        return tempTabs;
    }, [children]);
    const { selectedTab, changeSelectedTab } = (0, __1.useTabs)({
        tabs,
        group,
    });
    const tabRefs = (0, react_1.useRef)([]);
    const codeTabSelectorRef = (0, react_1.useRef)(null);
    const codeTabsWrapperRef = (0, react_1.useRef)(null);
    const bgColor = (0, react_1.useMemo)(() => (0, clsx_1.default)(blockStyle === "loud" && "bg-medusa-contrast-bg-base", blockStyle === "subtle" && [
        colorMode === "light" && "bg-medusa-bg-component",
        colorMode === "dark" && "bg-medusa-code-bg-header",
    ]), [blockStyle, colorMode]);
    const boxShadow = (0, react_1.useMemo)(() => (0, clsx_1.default)(blockStyle === "loud" &&
        "shadow-elevation-code-block dark:shadow-elevation-code-block-dark", blockStyle === "subtle" && "shadow-none"), [blockStyle]);
    const changeTabSelectorCoordinates = (0, react_1.useCallback)((selectedTabElm) => {
        if (!codeTabSelectorRef?.current || !codeTabsWrapperRef?.current) {
            return;
        }
        const selectedTabsCoordinates = selectedTabElm.getBoundingClientRect();
        const tabsWrapperCoordinates = codeTabsWrapperRef.current.getBoundingClientRect();
        codeTabSelectorRef.current.style.left = `${selectedTabsCoordinates.left - tabsWrapperCoordinates.left}px`;
        codeTabSelectorRef.current.style.width = `${selectedTabsCoordinates.width}px`;
        if (blockStyle !== "loud") {
            codeTabSelectorRef.current.style.height = `${selectedTabsCoordinates.height}px`;
        }
    }, [blockStyle]);
    (0, react_1.useEffect)(() => {
        if (codeTabSelectorRef?.current && tabRefs.current.length) {
            const selectedTabElm = tabRefs.current.find((tab) => tab?.getAttribute("aria-selected") === "true");
            if (selectedTabElm) {
                changeTabSelectorCoordinates(selectedTabElm.parentElement || selectedTabElm);
            }
        }
    }, [codeTabSelectorRef, tabRefs, changeTabSelectorCoordinates, selectedTab]);
    const actionsProps = (0, react_1.useMemo)(() => {
        if (!selectedTab) {
            return;
        }
        return {
            source: selectedTab?.codeProps.source,
            blockStyle,
            noReport: selectedTab?.codeProps.noReport,
            noCopy: selectedTab?.codeProps.noCopy,
            inInnerCode: true,
            showGradientBg: false,
            inHeader: true,
            isCollapsed: false,
        };
    }, [selectedTab]);
    // Reset tabRefs array before each render
    tabRefs.current = [];
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("my-docs_1 w-full max-w-full", "rounded-docs_lg", bgColor, boxShadow, className) },
        react_1.default.createElement(Wrapper_1.CodeBlockHeaderWrapper, { blockStyle: blockStyle, ref: codeTabsWrapperRef },
            react_1.default.createElement("span", { className: (0, clsx_1.default)("xs:absolute xs:transition-all xs:duration-200 xs:ease-ease xs:bottom-0", blockStyle === "loud" && "bg-medusa-contrast-fg-primary h-px", blockStyle === "subtle" && [
                    colorMode === "light" &&
                        "xs:border-medusa-border-base xs:bg-medusa-bg-base",
                    colorMode === "dark" &&
                        "xs:border-medusa-code-border xs:bg-medusa-code-bg-base",
                ]), ref: codeTabSelectorRef }),
            react_1.default.createElement("div", { className: "flex gap-docs_1 items-center" },
                selectedTab?.codeProps.badgeLabel && (react_1.default.createElement(__1.Badge, { variant: selectedTab?.codeProps.badgeColor || "code", className: "!font-base" }, selectedTab.codeProps.badgeLabel)),
                react_1.default.createElement("ul", { className: (0, clsx_1.default)("!list-none flex gap-docs_0.75 items-center", "p-0 mb-0") }, react_1.Children.map(children, (child, index) => {
                    if (!react_1.default.isValidElement(child)) {
                        return react_1.default.createElement(react_1.default.Fragment, null);
                    }
                    return (react_1.default.createElement(child.type, { ...(typeof child.props === "object" ? child.props : {}), changeSelectedTab: changeSelectedTab, pushRef: (tabButton) => tabRefs.current.push(tabButton), blockStyle: blockStyle, isSelected: !selectedTab
                            ? index === 0
                            : selectedTab.value === child.props.value }));
                }))),
            actionsProps && react_1.default.createElement(Actions_1.CodeBlockActions, { ...actionsProps })),
        selectedTab?.codeBlock));
};
exports.CodeTabs = CodeTabs;
