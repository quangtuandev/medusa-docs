import React from "react";
export type ButtonVariants = "primary" | "secondary" | "transparent" | "transparent-clear";
export type ButtonType = "default" | "icon";
export type ButtonProps = {
    isSelected?: boolean;
    disabled?: boolean;
    variant?: ButtonVariants;
    className?: string;
    buttonType?: ButtonType;
    buttonRef?: React.LegacyRef<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
} & React.HTMLAttributes<HTMLButtonElement>;
export declare const Button: ({ className, children, variant, buttonType, buttonRef, ...props }: ButtonProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map