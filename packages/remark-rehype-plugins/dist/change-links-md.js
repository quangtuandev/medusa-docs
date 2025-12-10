export const changeLinksToHtmlMdPlugin = () => {
    return async (tree) => {
        const { visit } = await import("unist-util-visit");
        visit(tree, ["link"], (node) => {
            if (node.type === "link" &&
                node.url?.startsWith("https://docs.medusajs.com") &&
                !node.url.endsWith("index.html.md") &&
                !node.url.includes("/api/store") &&
                !node.url.includes("/api/admin")) {
                node.url += `/index.html.md`;
            }
        });
    };
};
