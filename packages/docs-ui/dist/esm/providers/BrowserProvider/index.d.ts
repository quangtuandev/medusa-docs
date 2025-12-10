import React from "react";
type BrowserContextType = {
    isBrowser: boolean;
};
type BrowserProviderProps = {
    children: React.ReactNode;
};
export declare const BrowserProvider: ({ children }: BrowserProviderProps) => React.JSX.Element;
export declare const useIsBrowser: () => BrowserContextType;
export {};
//# sourceMappingURL=index.d.ts.map