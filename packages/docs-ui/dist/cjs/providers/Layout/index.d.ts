import React from "react";
export type LayoutProviderContextType = {
    mainContentRef: React.RefObject<HTMLDivElement | null>;
    showCollapsedNavbar: boolean;
};
export declare const LayoutProviderContext: React.Context<LayoutProviderContextType | null>;
export type LayoutProviderProps = {
    children: React.ReactNode;
    disableResizeObserver?: boolean;
};
export declare const LayoutProvider: ({ children, disableResizeObserver, }: LayoutProviderProps) => React.JSX.Element;
export declare const useLayout: () => LayoutProviderContextType;
//# sourceMappingURL=index.d.ts.map