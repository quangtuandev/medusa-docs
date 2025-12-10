import React from "react";
import { CodeBlockStyle } from "..";
import { BadgeVariant } from "../../../components";
import { CodeBlockActionsProps } from "../Actions";
export type CodeBlockHeaderMeta = {
    badgeLabel?: string;
    badgeColor?: BadgeVariant;
};
type CodeBlockHeaderProps = {
    title?: string;
    blockStyle?: CodeBlockStyle;
    actionsProps: CodeBlockActionsProps;
    hideActions?: boolean;
} & CodeBlockHeaderMeta;
export declare const CodeBlockHeader: ({ title, blockStyle, badgeLabel, actionsProps, badgeColor, hideActions, }: CodeBlockHeaderProps) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map