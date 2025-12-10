import React from "react";
import type { LinkProps as NextLinkProps } from "next/link";
type LinkButtonProps = NextLinkProps & {
    variant?: "base" | "interactive" | "subtle" | "muted";
    className?: string;
} & React.AllHTMLAttributes<HTMLAnchorElement>;
export declare const LinkButton: ({ variant, className, ...linkProps }: LinkButtonProps) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map