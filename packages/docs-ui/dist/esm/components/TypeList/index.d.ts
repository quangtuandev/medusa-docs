import React from "react";
export type CommonProps = {
    expandUrl?: string;
    sectionTitle?: string;
    openedLevel?: number;
};
export type Type = {
    name: string;
    type: string;
    optional?: boolean;
    defaultValue?: string;
    description?: string;
    featureFlag?: string;
    expandable: boolean;
    children?: Type[];
    deprecated?: {
        is_deprecated: boolean;
        description?: string;
    };
    since?: string;
};
type ParameterTypesType = {
    types: Type[];
    sectionTitle?: string;
} & CommonProps & React.HTMLAttributes<HTMLDivElement>;
export declare const TypeList: ({ types, className, sectionTitle, expandUrl, openedLevel, ...props }: ParameterTypesType) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map