import React from "react";
import { MenuItem } from "types";
type DropdownMenuProps = {
    dropdownButtonContent: React.ReactNode;
    dropdownButtonClassName?: string;
    menuComponent?: React.ReactNode;
    menuItems?: MenuItem[];
    menuClassName?: string;
    className?: string;
    open?: boolean;
    setOpen?: (open: boolean) => void;
};
export declare const DropdownMenu: ({ dropdownButtonContent, dropdownButtonClassName, menuComponent, menuItems, menuClassName, className, open: externalOpen, setOpen: externalSetOpen, }: DropdownMenuProps) => React.JSX.Element | null;
export {};
//# sourceMappingURL=index.d.ts.map