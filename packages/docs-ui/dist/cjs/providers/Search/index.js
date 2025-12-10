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
exports.useSearch = exports.SearchProvider = void 0;
const react_1 = __importStar(require("react"));
const components_1 = require("../../components");
const lite_1 = require("algoliasearch/lite");
const clsx_1 = __importDefault(require("clsx"));
// @ts-expect-error can't install the types package because it doesn't support React v19
const react_transition_group_1 = require("react-transition-group");
const SearchContext = (0, react_1.createContext)(null);
const SearchProvider = ({ children, defaultIndex: initialDefaultIndex, searchProps, algolia, commands: initialCommands = [], modalClassName, indices, }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(initialDefaultIndex);
    const [commands, setCommands] = (0, react_1.useState)(initialCommands);
    const [command, setCommand] = (0, react_1.useState)(null);
    const modalRef = (0, react_1.useRef)(null);
    const searchClient = (0, react_1.useMemo)(() => (0, lite_1.liteClient)(algolia.appId, algolia.apiKey), [algolia.appId, algolia.apiKey]);
    (0, react_1.useEffect)(() => {
        if (initialDefaultIndex !== selectedIndex) {
            setSelectedIndex(initialDefaultIndex);
        }
    }, [initialDefaultIndex]);
    const componentWrapperRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        command?.action?.();
    }, [command]);
    return (react_1.default.createElement(SearchContext.Provider, { value: {
            isOpen,
            setIsOpen,
            searchClient,
            commands,
            command,
            setCommand,
            modalRef,
            setCommands,
            indices,
            selectedIndex,
            setSelectedIndex,
        } },
        children,
        react_1.default.createElement(components_1.Modal, { contentClassName: (0, clsx_1.default)("!p-0 overflow-hidden relative h-full", "flex flex-col justify-between"), modalContainerClassName: "!h-[95%] max-h-[95%] md:!h-[480px] md:max-h-[480px]", open: isOpen, onClose: () => setIsOpen(false), passedRef: modalRef, className: modalClassName },
            react_1.default.createElement(react_transition_group_1.SwitchTransition, null,
                react_1.default.createElement(react_transition_group_1.CSSTransition, { classNames: {
                        enter: command === null || !command.component
                            ? "animate-fadeInLeft animate-fast"
                            : "animate-fadeInRight animate-fast",
                        exit: command === null || !command.component
                            ? "animate-fadeOutLeft animate-fast"
                            : "animate-fadeOutRight animate-fast",
                    }, timeout: 250, key: command?.component ? command.name : "search", nodeRef: componentWrapperRef },
                    react_1.default.createElement("div", { ref: componentWrapperRef, className: "h-full" },
                        !command?.component && (react_1.default.createElement(components_1.Search, { ...searchProps, algolia: algolia })),
                        command?.component))))));
};
exports.SearchProvider = SearchProvider;
const useSearch = () => {
    const context = (0, react_1.useContext)(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used inside a SearchProvider");
    }
    return context;
};
exports.useSearch = useSearch;
