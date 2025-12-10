import { getFrontMatter, findPageTitle } from "docs-utils";
import { sidebarAttachCommonOptions } from "../index.js";
export async function getSidebarItemLink({ filePath, basePath, fileBasename, }) {
    const frontmatter = await getFrontMatter(filePath);
    if (frontmatter.sidebar_autogenerate_exclude) {
        return;
    }
    const newItem = sidebarAttachCommonOptions([
        {
            type: "link",
            path: frontmatter.slug ||
                filePath.replace(basePath, "").replace(`/${fileBasename}`, ""),
            title: frontmatter.sidebar_label || findPageTitle(filePath) || "",
            description: frontmatter.sidebar_description || "",
        },
    ])[0];
    return {
        ...newItem,
        sidebar_position: frontmatter.sidebar_position,
    };
}
