import React from "react";
type TroubleshootingSection = {
    title: string;
    content: React.ReactNode;
};
type DetailsListProps = {
    sections: TroubleshootingSection[];
} & React.AllHTMLAttributes<HTMLDivElement>;
export declare const DetailsList: ({ sections }: DetailsListProps) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map