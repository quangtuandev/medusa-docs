import React from "react";
import { IconProps } from "@medusajs/icons/dist/types";
export type BorderedIconProps = {
    icon?: string;
    IconComponent?: React.FC<IconProps> | null;
    wrapperClassName?: string;
    iconWrapperClassName?: string;
    iconClassName?: string;
    iconColorClassName?: string;
    iconWidth?: number;
    iconHeight?: number;
} & React.HTMLAttributes<HTMLSpanElement>;
export declare const BorderedIcon: ({ icon, IconComponent, iconWrapperClassName, iconClassName, iconColorClassName, wrapperClassName, iconWidth, iconHeight, }: BorderedIconProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map