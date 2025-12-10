import React from "react";
type SearchInputProps = {
    onChange: (value: string) => void;
} & Omit<React.ComponentProps<"input">, "onChange">;
export declare const SearchInput: ({ value, onChange, className, placeholder, ...props }: SearchInputProps) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map