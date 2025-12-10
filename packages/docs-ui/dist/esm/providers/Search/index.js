"use client";
import React, { createContext, useContext, useEffect, useState, useMemo, useRef, } from "react";
import { Modal, Search } from "../../components";
import { liteClient as algoliasearch, } from "algoliasearch/lite";
import clsx from "clsx";
// @ts-expect-error can't install the types package because it doesn't support React v19
import { CSSTransition, SwitchTransition } from "react-transition-group";
const SearchContext = createContext(null);
export const SearchProvider = ({ children, defaultIndex: initialDefaultIndex, searchProps, algolia, commands: initialCommands = [], modalClassName, indices, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(initialDefaultIndex);
    const [commands, setCommands] = useState(initialCommands);
    const [command, setCommand] = useState(null);
    const modalRef = useRef(null);
    const searchClient = useMemo(() => algoliasearch(algolia.appId, algolia.apiKey), [algolia.appId, algolia.apiKey]);
    useEffect(() => {
        if (initialDefaultIndex !== selectedIndex) {
            setSelectedIndex(initialDefaultIndex);
        }
    }, [initialDefaultIndex]);
    const componentWrapperRef = useRef(null);
    useEffect(() => {
        command?.action?.();
    }, [command]);
    return (React.createElement(SearchContext.Provider, { value: {
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
        React.createElement(Modal, { contentClassName: clsx("!p-0 overflow-hidden relative h-full", "flex flex-col justify-between"), modalContainerClassName: "!h-[95%] max-h-[95%] md:!h-[480px] md:max-h-[480px]", open: isOpen, onClose: () => setIsOpen(false), passedRef: modalRef, className: modalClassName },
            React.createElement(SwitchTransition, null,
                React.createElement(CSSTransition, { classNames: {
                        enter: command === null || !command.component
                            ? "animate-fadeInLeft animate-fast"
                            : "animate-fadeInRight animate-fast",
                        exit: command === null || !command.component
                            ? "animate-fadeOutLeft animate-fast"
                            : "animate-fadeOutRight animate-fast",
                    }, timeout: 250, key: command?.component ? command.name : "search", nodeRef: componentWrapperRef },
                    React.createElement("div", { ref: componentWrapperRef, className: "h-full" },
                        !command?.component && (React.createElement(Search, { ...searchProps, algolia: algolia })),
                        command?.component))))));
};
export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used inside a SearchProvider");
    }
    return context;
};
