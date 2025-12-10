import React from "react";
import { Type, CommonProps as ParentCommonProps } from "..";
type CommonProps = ParentCommonProps & {
    level?: number;
    referenceType?: "method" | "workflow";
};
type TypeListItemsProps = {
    types: Type[];
} & CommonProps;
declare const TypeListItems: ({ types, ...rest }: TypeListItemsProps) => React.JSX.Element;
export default TypeListItems;
//# sourceMappingURL=index.d.ts.map