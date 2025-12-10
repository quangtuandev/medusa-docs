export const sortSidebarItems = ({ items, type = "none", }) => {
    switch (type) {
        case "alphabetize":
            return alphabetizeSidebarItems(items);
        default:
            return items;
    }
};
const alphabetizeSidebarItems = (items) => {
    const segments = [];
    let currentSegment = [];
    items.forEach((item) => {
        if (item.type === "separator") {
            if (currentSegment.length > 0) {
                segments.push(currentSegment);
                currentSegment = [];
            }
            segments.push([item]);
        }
        else {
            currentSegment.push(item);
        }
    });
    if (currentSegment.length > 0) {
        segments.push(currentSegment);
    }
    return segments
        .map((segment) => {
        return segment[0].type === "separator"
            ? segment
            : segment.sort((a, b) => a.title.localeCompare(b.title));
    })
        .flat();
};
