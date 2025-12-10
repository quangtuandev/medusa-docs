import React from "react";
import { SidebarProps } from "../components";
import { MainContentLayoutProps } from "./main-content";
export type RootLayoutProps = {
    bodyClassName?: string;
    sidebarProps?: SidebarProps;
    showBreadcrumbs?: boolean;
    ProvidersComponent: React.FC<{
        children: React.ReactNode;
    }>;
    footerComponent?: React.ReactNode;
} & MainContentLayoutProps;
export declare const RootLayout: ({ bodyClassName, sidebarProps, ProvidersComponent, ...mainProps }: RootLayoutProps) => React.JSX.Element;
//# sourceMappingURL=root.d.ts.map