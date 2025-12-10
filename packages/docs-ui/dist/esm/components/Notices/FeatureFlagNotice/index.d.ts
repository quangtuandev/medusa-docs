import React from "react";
export type FeatureFlagNoticeProps = {
    featureFlag: string;
    type?: "endpoint" | "type";
    tooltipTextClassName?: string;
    badgeClassName?: string;
    badgeContent?: React.ReactNode;
};
export declare const FeatureFlagNotice: ({ featureFlag, type, tooltipTextClassName, badgeClassName, badgeContent, }: FeatureFlagNoticeProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map