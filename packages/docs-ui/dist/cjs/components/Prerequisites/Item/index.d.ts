import React from "react";
export type PrerequisiteItemPosition = "top" | "middle" | "bottom" | "alone";
export type PrerequisiteItemType = {
    text: string;
    link?: string;
    position?: PrerequisiteItemPosition;
};
type PrerequisiteItemProps = {
    item: PrerequisiteItemType;
};
export declare const PrerequisiteItem: ({ item: { text, link, position }, }: PrerequisiteItemProps) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map