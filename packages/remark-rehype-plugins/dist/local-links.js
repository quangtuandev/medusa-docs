import path from "path";
import { fixLinkUtil } from "./index.js";
export function localLinksRehypePlugin(options) {
    const { filePath, basePath } = options || {};
    return async (tree, file) => {
        if (!file.cwd) {
            return;
        }
        if (!file.history.length) {
            if (!filePath) {
                return;
            }
            file.history.push(filePath);
        }
        const { visit } = await import("unist-util-visit");
        const currentPageFilePath = file.history[0].replace(`/${path.basename(file.history[0])}`, "");
        const appsPath = basePath || path.join(file.cwd, "app");
        visit(tree, ["element", "link"], (node) => {
            if (node.tagName === "a") {
                if (!node.properties?.href?.match(/page\.mdx?/)) {
                    return;
                }
                node.properties.href = fixLinkUtil({
                    currentPageFilePath,
                    linkedPath: node.properties.href,
                    appsPath,
                });
            }
            else if (node.type === "link") {
                if (!node.url?.match(/page\.mdx?/)) {
                    return;
                }
                node.url = fixLinkUtil({
                    currentPageFilePath,
                    linkedPath: node.url,
                    appsPath,
                });
            }
        });
    };
}
