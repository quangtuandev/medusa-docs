import React from "react";
import { Tabs as UiTabs } from "@medusajs/ui";
import { ComponentProps } from "react";
type TabsProps = ComponentProps<typeof UiTabs> & {
    layoutType?: "horizontal" | "vertical";
};
export declare const Tabs: ({ layoutType, className, ...props }: TabsProps) => React.JSX.Element;
export declare const TabsList: ({ className, ...props }: ComponentProps<typeof UiTabs.List>) => React.JSX.Element;
export declare const TabsTrigger: ({ className, ...props }: ComponentProps<typeof UiTabs.Trigger>) => React.JSX.Element;
export declare const TabsTriggerVertical: ({ className, children, ...props }: ComponentProps<typeof UiTabs.Trigger>) => React.JSX.Element;
type TabsContentWrapperProps = {
    className?: string;
    children: React.ReactNode;
};
export declare const TabsContentWrapper: ({ className, ...props }: TabsContentWrapperProps) => React.JSX.Element;
export declare const TabsContent: (props: ComponentProps<typeof UiTabs.Content>) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map