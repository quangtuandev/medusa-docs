import React from "react";
export type CollapsibleProps = {
    initialValue?: boolean;
    heightAnimation?: boolean;
    translateEnabled?: boolean;
    onClose?: () => void;
    unmountOnExit?: boolean;
    childrenRef?: React.RefObject<HTMLElement | null>;
    useChild?: boolean;
};
export type CollapsibleReturn = {
    getCollapsibleElms: (children: React.ReactNode) => React.JSX.Element;
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare const useCollapsible: ({ initialValue, heightAnimation, translateEnabled, onClose, unmountOnExit, childrenRef, useChild, }: CollapsibleProps) => CollapsibleReturn;
//# sourceMappingURL=index.d.ts.map