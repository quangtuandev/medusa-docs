export function isElmWindow(elm) {
    return typeof window !== "undefined" && elm === window;
}
