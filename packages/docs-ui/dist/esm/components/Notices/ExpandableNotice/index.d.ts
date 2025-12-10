import React from "react";
export type ExpandableNoticeProps = {
    type: "request" | "method" | "workflow";
    link: string;
    badgeContent?: React.ReactNode;
    badgeClassName?: string;
};
export declare const ExpandableNotice: ({ type, link, badgeContent, badgeClassName, }: ExpandableNoticeProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map