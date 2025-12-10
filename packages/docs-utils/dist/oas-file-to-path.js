export function oasFileToPath(fileName) {
    return `/${fileName
        .replaceAll(/(?<!\{[^}]*)_(?![^{]*\})/g, "/")
        .replace(/\.[A-Za-z]+$/, "")}`;
}
