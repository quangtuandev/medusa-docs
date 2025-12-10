import { getFrontMatter } from "./get-front-matter.js";
export async function getFileSlug(filePath) {
    const fileFrontmatter = await getFrontMatter(filePath);
    if (fileFrontmatter.slug) {
        // add to slugs array
        return fileFrontmatter.slug;
    }
}
