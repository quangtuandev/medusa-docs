export function getLinkWithBasePath(path, basePath) {
    return `${basePath || ""}${path}`;
}
