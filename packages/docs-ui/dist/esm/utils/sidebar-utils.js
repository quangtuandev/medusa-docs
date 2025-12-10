export const isSidebarItemLink = (item, options) => {
    const { checkRef = true, checkExternal = true } = options || {};
    return (item !== undefined &&
        (item.type === "link" ||
            (checkRef && item.type === "ref") ||
            (checkExternal && item.type === "external")));
};
export const areSidebarItemsEqual = ({ itemA, itemB, compareTitles = true, }) => {
    if (itemA.type !== itemB.type) {
        return false;
    }
    // after this, we know that itemA and itemB have the same type
    switch (itemA.type) {
        case "separator":
            return true;
        case "sidebar":
            return (itemA.sidebar_id === itemB.sidebar_id);
        case "category":
        case "sub-category":
            return compareTitles
                ? itemA.title === itemB.title
                : false;
        case "link":
        case "ref":
        case "external": {
            const hasSameTitle = !compareTitles ||
                itemA.title === itemB.title;
            const hasSamePath = itemA.path === itemB.path;
            return hasSameTitle && hasSamePath;
        }
    }
};
export const findSidebarItem = ({ sidebarItems, item, checkChildren = true, compareTitles = true, }) => {
    let foundItem;
    sidebarItems.some((i) => {
        if (areSidebarItemsEqual({ itemA: i, itemB: item, compareTitles })) {
            foundItem = i;
        }
        else if (checkChildren && "children" in i && i.children) {
            foundItem = findSidebarItem({
                sidebarItems: i.children,
                item,
                checkChildren,
                compareTitles,
            });
        }
        return foundItem !== undefined;
    });
    return foundItem;
};
export const getSidebarItemWithHistory = ({ sidebarItems, item, sidebarHistory = [], checkChildren = true, compareTitles = true, }) => {
    let foundItem;
    sidebarItems.some((i) => {
        if (areSidebarItemsEqual({ itemA: i, itemB: item, compareTitles })) {
            foundItem = i;
        }
        else if (checkChildren && "children" in i && i.children) {
            const result = getSidebarItemWithHistory({
                sidebarItems: i.children,
                item,
                checkChildren,
                compareTitles,
            });
            if (result.item) {
                foundItem = result.item;
                if (i.type === "sidebar") {
                    sidebarHistory.push(i.sidebar_id);
                }
                sidebarHistory.push(...result.sidebarHistory);
            }
        }
        return foundItem !== undefined;
    });
    return { item: foundItem, sidebarHistory };
};
