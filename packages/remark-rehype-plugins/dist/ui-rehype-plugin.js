import fs from "fs";
import path from "path";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";
export function uiRehypePlugin({ exampleRegistry }) {
    return async (tree) => {
        visit(tree, (node) => {
            if (node.name === "ComponentExample") {
                const name = getNodeAttributeByName(node, "name")?.value;
                if (!name) {
                    return null;
                }
                try {
                    const component = exampleRegistry[name];
                    const src = component.file;
                    const filePath = path.join(process.cwd(), src);
                    let source = fs.readFileSync(filePath, "utf8");
                    source = source.replaceAll("export default", "export");
                    // Trim newline at the end of file. It's correct, but it makes source display look off
                    if (source.endsWith("\n")) {
                        source = source.substring(0, source.length - 1);
                    }
                    node.children?.push(u("element", {
                        tagName: "span",
                        properties: {
                            __src__: src,
                            codeLinesJSON: JSON.stringify(source.split("\n")),
                        },
                    }));
                }
                catch (error) {
                    console.error(error);
                }
            }
            else if (node.name === "ComponentReference") {
                const mainComponent = getNodeAttributeByName(node, "mainComponent")
                    ?.value;
                if (!mainComponent) {
                    return null;
                }
                const mainSpecsDir = path.join(process.cwd(), "specs", "components");
                const componentSpecsDir = path.join(mainSpecsDir, mainComponent);
                const specs = [];
                const specFiles = fs.readdirSync(componentSpecsDir);
                specFiles.map((specFileName) => {
                    // read spec file
                    const specFile = fs.readFileSync(path.join(componentSpecsDir, specFileName), "utf-8");
                    specs.push(JSON.parse(specFile));
                });
                node.attributes?.push({
                    name: "specsSrc",
                    value: JSON.stringify(specs),
                    type: "mdxJsxAttribute",
                });
            }
        });
    };
}
function getNodeAttributeByName(node, name) {
    return node.attributes?.find((attribute) => attribute.name === name);
}
