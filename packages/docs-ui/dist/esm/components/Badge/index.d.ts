import React from "react";
export type BadgeVariant = "purple" | "orange" | "green" | "blue" | "red" | "neutral" | "code";
export type BadgeType = "default" | "shaded";
export type BadgeProps = {
    className?: string;
    childrenWrapperClassName?: string;
    variant: BadgeVariant;
    badgeType?: BadgeType;
} & React.HTMLAttributes<HTMLSpanElement>;
export declare const Badge: ({ className, variant, badgeType, children, childrenWrapperClassName, }: BadgeProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map