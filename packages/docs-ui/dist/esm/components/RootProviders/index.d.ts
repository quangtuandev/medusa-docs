import React from "react";
import { LayoutProviderProps } from "../../providers";
type RootProvidersProps = {
    children: React.ReactNode;
    layoutProviderProps?: Omit<LayoutProviderProps, "children">;
};
export declare const RootProviders: ({ children, layoutProviderProps, }: RootProvidersProps) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map