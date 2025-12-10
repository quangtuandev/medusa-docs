import React from "react";
import type { LinkProps as NextLinkProps } from "next/link";
export type LinkProps = Partial<NextLinkProps> & React.AllHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    children?: React.ReactNode;
    className?: string;
    withIcon?: boolean;
    variant?: "default" | "content";
};
export declare const Link: ({ href, children, className, withIcon, variant, ...rest }: LinkProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map