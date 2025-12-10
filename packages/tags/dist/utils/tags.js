import * as tags from "../tags/index.js";
export const getTagItems = (tagName) => {
    if (!Object.hasOwn(tags, tagName)) {
        return;
    }
    return tags[tagName];
};
export const getAllTags = () => {
    return tags;
};
