import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { read, readSync } from "to-vfile";
import { matter } from "vfile-matter";
export async function getFrontMatter(filePath) {
    return (await unified()
        .use(remarkParse)
        .use(remarkStringify)
        .use(remarkFrontmatter, ["yaml"])
        .use(() => {
        return (tree, file) => {
            matter(file);
        };
    })
        .process(await read(filePath))).data.matter;
}
export function getFrontMatterSync(filePath) {
    const content = readSync(filePath);
    matter(content);
    return content.data.matter;
}
export async function getFrontMatterFromString(fileContent) {
    return (await unified()
        .use(remarkParse)
        .use(remarkStringify)
        .use(remarkFrontmatter, ["yaml"])
        .use(() => {
        return (tree, file) => {
            matter(file);
        };
    })
        .process(fileContent)).data.matter;
}
