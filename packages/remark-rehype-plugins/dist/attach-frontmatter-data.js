export function remarkAttachFrontmatterDataPlugin() {
    return async (tree, file) => {
        const { matter } = await import("vfile-matter");
        matter(file);
    };
}
