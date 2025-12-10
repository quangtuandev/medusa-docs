import { getCleanMd } from "docs-utils";
import { fdir } from "fdir";
import { writeFile } from "fs/promises";
import path from "path";
import { apiRefLlmsGenerator, jsSdkLlmsGenerator, stepsLlmsGenerator, workflowsLlmsGenerator, } from "./utils/custom-llms-generators.js";
const generators = {
    workflows: workflowsLlmsGenerator,
    steps: stepsLlmsGenerator,
    jsSdk: jsSdkLlmsGenerator,
    apiRef: apiRefLlmsGenerator,
};
const isExtAllowed = (fileName, allowedExt) => {
    switch (allowedExt) {
        case "md":
            return fileName.endsWith(".md") || fileName.endsWith(".mdx");
        case "yaml":
            return fileName.endsWith(".yaml") || fileName.endsWith(".yml");
    }
};
const getContentFromDir = async ({ dir, options = {}, allowedFilesPatterns, generator, ext = "md", }) => {
    const files = (await new fdir()
        .withFullPaths()
        .filter((file) => {
        const baseName = path.basename(file);
        return isExtAllowed(baseName, ext) && !baseName.startsWith("_");
    })
        .filter((file) => !allowedFilesPatterns?.length ||
        allowedFilesPatterns.some((pattern) => file.match(pattern)))
        .crawl(dir)
        .withPromise()).sort();
    const content = generator?.name && generators[generator?.name]
        ? [await generators[generator?.name](files, generator.options)]
        : [];
    if (content.length) {
        return await getCleanMd({
            file: content.join("\n\n"),
            ...options,
            type: "content",
        });
    }
    for (const file of files) {
        content.push(await getCleanMd({
            file,
            ...options,
        }));
    }
    return content.join("\n\n");
};
export const generateLlmsFull = async ({ outputPath, scanDirs, introText = "", plugins, }) => {
    const text = [introText];
    for (const scanDir of scanDirs) {
        text.push(await getContentFromDir({
            ...scanDir,
            options: {
                plugins,
                ...scanDir.options,
            },
        }));
    }
    await writeFile(outputPath, text.join("\n\n"));
};
