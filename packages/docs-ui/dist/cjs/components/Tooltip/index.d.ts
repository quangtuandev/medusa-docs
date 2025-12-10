import React from "react";
import type { ITooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
export type TooltipProps = {
    text?: string;
    tooltipClassName?: string;
    html?: string;
    tooltipChildren?: React.ReactNode;
    innerClassName?: string;
} & React.HTMLAttributes<HTMLSpanElement> & ITooltip;
export declare const Tooltip: React.ForwardRefExoticComponent<{
    text?: string | undefined;
    tooltipClassName?: string | undefined;
    html?: string | undefined;
    tooltipChildren?: React.ReactNode;
    innerClassName?: string | undefined;
} & React.HTMLAttributes<HTMLSpanElement> & ITooltip & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=index.d.ts.map