import React from "react";
export type CopyButtonChildFn = (props: {
    isCopied: boolean;
}) => React.ReactNode;
export type CopyButtonProps = {
    text: string;
    buttonClassName?: string;
    tooltipClassName?: string;
    tooltipInnerClassName?: string;
    tooltipText?: string;
    onCopy?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.TouchEvent<HTMLSpanElement>) => void;
    handleTouch?: boolean;
    children?: React.ReactNode | CopyButtonChildFn;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onCopy" | "children">;
export declare const CopyButton: ({ text, buttonClassName, tooltipClassName, tooltipText, children, className, onCopy, handleTouch, tooltipInnerClassName, }: CopyButtonProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map