export const validateSidebarUniqueIds = (sidebars, sidebarIds = new Set()) => {
    for (const sidebar of sidebars) {
        if (sidebarIds.has(sidebar.sidebar_id)) {
            throw new Error(`Duplicate sidebar item id found: ${sidebar.sidebar_id}`);
        }
        sidebarIds.add(sidebar.sidebar_id);
        const children = ("items" in sidebar ? sidebar.items : sidebar.children || []).filter((child) => child.type === "sidebar");
        validateSidebarUniqueIds(children, sidebarIds);
    }
};
