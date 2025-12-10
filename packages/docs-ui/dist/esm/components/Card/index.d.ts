import React from "react";
import { BadgeProps } from "../../components";
import { IconProps } from "@medusajs/icons/dist/types";
import { LinkProps } from "next/link";
export type CardProps = {
    type?: "default" | "large" | "filler" | "mini";
    icon?: React.FC<IconProps>;
    rightIcon?: React.FC<IconProps>;
    image?: string;
    themeImage?: {
        light: string;
        dark: string;
    };
    imageDimensions?: {
        width: number;
        height: number;
    };
    title?: string;
    text?: string;
    href?: string;
    className?: string;
    contentClassName?: string;
    iconClassName?: string;
    children?: React.ReactNode;
    badge?: BadgeProps;
    highlightText?: string[];
    closeable?: boolean;
    onClose?: () => void;
    hrefProps?: Partial<LinkProps & React.AllHTMLAttributes<HTMLAnchorElement>>;
    cardRef?: React.Ref<HTMLDivElement>;
};
export declare const Card: ({ type, ...props }: CardProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map