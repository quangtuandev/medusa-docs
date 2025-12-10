import { navDropdownItems } from "..";
export function getNavDropdownItems({ basePath }) {
    return navDropdownItems.map((item) => {
        const newItem = {
            ...item,
        };
        if (newItem.link) {
            newItem.link = `${basePath}${newItem.link}`;
        }
        if (newItem.type === "dropdown") {
            newItem.children = normalizeMenuItems({
                basePath,
                items: newItem.children,
            });
        }
        return newItem;
    });
}
export function normalizeMenuItems({ basePath, items, }) {
    return items.map((item) => {
        const newItem = { ...item };
        if (newItem.type !== "link" && newItem.type !== "sub-menu") {
            return newItem;
        }
        if (newItem.link) {
            newItem.link = `${basePath}${newItem.link}`;
        }
        if (newItem.type === "sub-menu") {
            newItem.items = normalizeMenuItems({
                basePath,
                items: newItem.items,
            });
        }
        return newItem;
    });
}
