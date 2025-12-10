export function decodeStr(str) {
    return str
        .replaceAll("&#60;", "<")
        .replaceAll("&#123;", "{")
        .replaceAll("&#125;", "}")
        .replaceAll("&#62;", ">")
        .replaceAll("\\|", "|");
}
