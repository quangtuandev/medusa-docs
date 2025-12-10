import React from "react";
type RootProps = React.HTMLAttributes<HTMLTableElement>;
type HeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;
type HeaderCellProps = React.HTMLAttributes<HTMLTableCellElement>;
type CellProps = React.HTMLAttributes<HTMLTableCellElement>;
type BodyProps = React.HTMLAttributes<HTMLTableSectionElement>;
declare const Table: (({ className, ...props }: RootProps) => React.JSX.Element) & {
    Row: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
    Cell: ({ className, ...props }: CellProps) => React.JSX.Element;
    Header: ({ className, ...props }: HeaderProps) => React.JSX.Element;
    HeaderCell: ({ className, ...props }: HeaderCellProps) => React.JSX.Element;
    Body: ({ className, ...props }: BodyProps) => React.JSX.Element;
};
export { Table };
//# sourceMappingURL=index.d.ts.map