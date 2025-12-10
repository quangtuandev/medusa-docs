import React from "react";
import { IconProps } from "@medusajs/icons/dist/types";
type InlineIconProps = IconProps & {
    Icon: React.ComponentType<IconProps>;
    alt?: string;
};
export declare const InlineIcon: ({ Icon, alt, ...props }: InlineIconProps) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map