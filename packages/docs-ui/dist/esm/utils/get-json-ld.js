export function getJsonLd(data) {
    return JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
}
