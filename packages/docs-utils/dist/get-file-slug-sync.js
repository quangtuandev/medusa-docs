import { matter } from "vfile-matter";
import { readSync } from "to-vfile";
export function getFileSlugSync(filePath) {
    const content = readSync(filePath);
    matter(content);
    return content.data.matter.slug || undefined;
}
