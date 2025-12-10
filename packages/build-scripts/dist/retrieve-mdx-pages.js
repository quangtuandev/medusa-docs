import { readdirSync } from "fs";
import path from "path";
import { getFileSlugSync } from "docs-utils";
export function retrieveMdxPages({ basePath }) {
    function retrieveMdxFilesInPath(dir) {
        const urls = [];
        const files = readdirSync(dir, {
            withFileTypes: true,
        });
        for (const file of files) {
            const filePath = path.join(dir, file.name);
            if (file.isDirectory()) {
                if (!file.name.startsWith("_")) {
                    urls.push(...retrieveMdxFilesInPath(filePath));
                }
                continue;
            }
            else if (file.name !== "page.mdx") {
                continue;
            }
            const slug = getFileSlugSync(filePath);
            const url = (slug || filePath.replace(basePath, ""))
                .replace(file.name, "")
                .replace(/\/$/, "");
            urls.push(url);
        }
        return urls;
    }
    return retrieveMdxFilesInPath(basePath);
}
