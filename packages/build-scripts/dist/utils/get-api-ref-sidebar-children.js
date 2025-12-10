import path from "path";
import { findAllPageHeadings, getSectionId } from "docs-utils";
import { readFile } from "fs/promises";
import { parse } from "@readme/openapi-parser";
import pkg from "pluralize";
const { singular } = pkg;
export default async function getApiRefSidebarChildren(sidebar) {
    if (!sidebar) {
        return [];
    }
    const projPath = path.resolve();
    const area = sidebar.sidebar_id;
    const items = [
        {
            type: "link",
            title: "Introduction",
            path: "introduction",
            loaded: true,
        },
    ];
    // get sidebar items from markdown files
    const markdownPath = path.join(projPath, "markdown", `${area}.mdx`);
    const headings = findAllPageHeadings({
        content: await readFile(markdownPath, "utf-8"),
        level: 2,
    });
    headings.forEach((heading) => {
        items.push({
            type: "link",
            title: heading,
            path: getSectionId([heading]),
            loaded: true,
        });
    });
    // read base specs
    const baseSpecs = (await parse(path.join(projPath, "specs", area, "openapi.yaml")));
    if (baseSpecs.tags?.length) {
        items.push({
            type: "separator",
        });
    }
    // add tags to sidebar
    baseSpecs.tags?.forEach((tag) => {
        const item = {
            type: "category",
            title: tag.name,
            children: [],
            loaded: false,
            showLoadingIfEmpty: true,
        };
        if (tag["x-associatedSchema"]) {
            const formattedName = singular(tag.name).replaceAll(" ", "");
            const schemaSlug = getSectionId([tag.name, formattedName, "schema"]);
            item.children.push({
                type: "link",
                path: schemaSlug,
                title: `${formattedName} Object`,
                loaded: true,
                badge: {
                    variant: "neutral",
                    text: "Schema",
                },
            });
        }
        items.push(item);
    });
    return items;
}
