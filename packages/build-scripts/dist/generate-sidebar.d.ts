import { Sidebar } from "types";
export type ItemsToAdd = Sidebar.SidebarItem & {
    sidebar_position?: number;
};
export type GenerateSidebarOptions = {
    addNumbering?: boolean;
    writeToFile?: boolean;
};
export declare function generateSidebar(sidebars: Sidebar.RawSidebar[], options?: GenerateSidebarOptions): Promise<void | Sidebar.RawSidebar[]>;
//# sourceMappingURL=generate-sidebar.d.ts.map