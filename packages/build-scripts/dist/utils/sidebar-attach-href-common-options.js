const commonOptions = {
    loaded: true,
    isPathHref: true,
};
export function sidebarAttachCommonOptions(sidebar) {
    return sidebar.map((item) => {
        if (item.type === "separator") {
            return item;
        }
        return {
            ...commonOptions,
            ...item,
            children: sidebarAttachCommonOptions(item.children || []),
        };
    });
}
