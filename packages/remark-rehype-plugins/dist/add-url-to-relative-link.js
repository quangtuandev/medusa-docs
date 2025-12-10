export function addUrlToRelativeLink(options) {
    return async (tree) => {
        const { visit } = await import("unist-util-visit");
        visit(tree, "link", (node) => {
            if (!node.url || !node.url.startsWith("/")) {
                return;
            }
            node.url = `${options.url}${node.url}`;
        });
    };
}
