import React from "react";
import { BadgeProps, SearchProps } from "../../components";
import { LiteClient as SearchClient } from "algoliasearch/lite";
export type SearchCommand = {
    name: string;
    component?: React.ReactNode;
    action?: () => void;
    icon?: React.ReactNode;
    title: string;
    badge?: BadgeProps;
};
export type SearchContextType = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    searchClient: SearchClient;
    commands: SearchCommand[];
    command: SearchCommand | null;
    setCommand: React.Dispatch<React.SetStateAction<SearchCommand | null>>;
    setCommands: React.Dispatch<React.SetStateAction<SearchCommand[]>>;
    modalRef: React.RefObject<HTMLDialogElement | null>;
    indices: AlgoliaIndex[];
    selectedIndex: string;
    setSelectedIndex: (value: string) => void;
};
export type AlgoliaIndex = {
    value: string;
    title: string;
};
export type AlgoliaProps = {
    appId: string;
    apiKey: string;
    mainIndexName: string;
};
export type SearchProviderProps = {
    children: React.ReactNode;
    indices: AlgoliaIndex[];
    defaultIndex: string;
    algolia: AlgoliaProps;
    searchProps: Omit<SearchProps, "algolia">;
    commands?: SearchCommand[];
    modalClassName?: string;
};
export declare const SearchProvider: ({ children, defaultIndex: initialDefaultIndex, searchProps, algolia, commands: initialCommands, modalClassName, indices, }: SearchProviderProps) => React.JSX.Element;
export declare const useSearch: () => SearchContextType;
//# sourceMappingURL=index.d.ts.map