const PROJECT_REGEX = /^!(?<area>[\w-]+)!/;
export const parseCrossProjectLink = (link) => {
    const projectArea = PROJECT_REGEX.exec(link);
    if (!projectArea?.groups?.area) {
        return undefined;
    }
    return {
        area: projectArea.groups.area,
        path: link.replace(PROJECT_REGEX, ""),
    };
};
