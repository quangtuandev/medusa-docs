import React from "react";
export type NoteProps = {
    type?: "default" | "warning" | "success" | "error" | "check" | "soon";
    title?: string;
    children?: React.ReactNode;
    forceMultiline?: boolean;
};
export declare const Note: ({ type, ...props }: NoteProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map