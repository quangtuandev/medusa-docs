import React from "react";
export type Page = {
    title: string;
    description?: string;
    parentTitle?: string;
    link: string;
};
export type PaginationContextType = {
    nextPage?: Page;
    previousPage?: Page;
};
export declare const PaginationContext: React.Context<PaginationContextType | null>;
export type PaginationProviderProps = {
    children?: React.ReactNode;
};
export declare const PaginationProvider: ({ children }: PaginationProviderProps) => React.JSX.Element;
export declare const usePagination: () => PaginationContextType;
//# sourceMappingURL=index.d.ts.map