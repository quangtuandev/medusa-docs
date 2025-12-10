import { SKIP } from "unist-util-visit";
import { estreeToJs } from "../estree-to-js.js";
import { isExpressionJsVarLiteral, isExpressionJsVarObj, } from "../expression-is-utils.js";
import path from "path";
import { readFileSync } from "fs";
export const parseCard = (node, index, parent) => {
    let title, text, href;
    node.attributes?.some((attr) => {
        if (title && text && href) {
            return true;
        }
        if (attr.name === "title") {
            title = attr.value;
        }
        else if (attr.name === "text") {
            text = attr.value;
        }
        else if (attr.name === "href") {
            href = attr.value;
        }
        return false;
    });
    if (!title || !href) {
        return;
    }
    parent?.children.splice(index, 1, {
        type: "paragraph",
        children: [
            {
                type: "link",
                url: href,
                children: [
                    {
                        type: "text",
                        value: title,
                    },
                ],
            },
            {
                type: "text",
                value: `: ${text}`,
            },
        ],
    });
    return [SKIP, index];
};
export const parseCardList = (node, index, parent) => {
    const items = node.attributes?.find((attr) => attr.name === "items");
    if (!items || typeof items.value === "string" || !items.value.data?.estree) {
        return;
    }
    const itemsJsVar = estreeToJs(items.value.data.estree);
    if (!itemsJsVar || !Array.isArray(itemsJsVar)) {
        return;
    }
    const listItems = itemsJsVar
        .map((item) => {
        if (!isExpressionJsVarObj(item) ||
            !("title" in item) ||
            !("href" in item) ||
            !isExpressionJsVarLiteral(item.title) ||
            !isExpressionJsVarLiteral(item.href)) {
            return null;
        }
        const description = isExpressionJsVarLiteral(item.text)
            ? item.text.data
            : "";
        const children = [
            {
                type: "link",
                url: `${item.href.data}`,
                children: [
                    {
                        type: "text",
                        value: item.title.data,
                    },
                ],
            },
        ];
        if (description.length) {
            children.push({
                type: "text",
                value: `: ${description}`,
            });
        }
        return {
            type: "listItem",
            children: [
                {
                    type: "paragraph",
                    children,
                },
            ],
        };
    })
        .filter(Boolean);
    parent?.children.splice(index, 1, {
        type: "list",
        ordered: false,
        spread: false,
        children: listItems,
    });
    return [SKIP, index];
};
export const parseCodeTabs = (node, index, parent) => {
    const tabs = node.children?.filter((child) => child.name === "CodeTab");
    if (!tabs) {
        return;
    }
    const children = [];
    tabs.forEach((tab) => {
        const label = tab.attributes?.find((attr) => attr.name === "label");
        const code = tab.children?.find((child) => child.type === "code");
        if (!label || !code) {
            return;
        }
        children.push({
            type: "heading",
            depth: 3,
            children: [
                {
                    type: "text",
                    value: label.value,
                },
            ],
        }, code);
    });
    parent?.children.splice(index, 1, ...children);
    return [SKIP, index];
};
export const parseDetails = (node, index, parent) => {
    const summary = node.attributes?.find((attr) => attr.name === "summaryContent");
    const children = [];
    if (summary?.value) {
        children.push({
            type: "heading",
            depth: 3,
            children: [
                {
                    type: "text",
                    value: summary?.value || "Details",
                },
            ],
        });
    }
    children.push(...(node.children || []));
    parent?.children.splice(index, 1, ...children);
    return [SKIP, index];
};
export const parseNote = (node, index, parent) => {
    parent.children?.splice(index, 1, ...(node.children || []));
    return [SKIP, index];
};
export const parsePrerequisites = (node, index, parent) => {
    const items = node.attributes?.find((attr) => attr.name === "items");
    if (!items || typeof items.value === "string" || !items.value.data?.estree) {
        return;
    }
    const itemsJsVar = estreeToJs(items.value.data.estree);
    if (!itemsJsVar || !Array.isArray(itemsJsVar)) {
        return;
    }
    const listItems = itemsJsVar
        .map((item) => {
        if (!isExpressionJsVarObj(item) ||
            !("text" in item) ||
            !("link" in item) ||
            !isExpressionJsVarLiteral(item.text) ||
            !isExpressionJsVarLiteral(item.link)) {
            return null;
        }
        return {
            type: "listItem",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "link",
                            url: `${item.link.data}`,
                            children: [
                                {
                                    type: "text",
                                    value: item.text.data,
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    })
        .filter(Boolean);
    parent?.children.splice(index, 1, {
        type: "heading",
        depth: 3,
        children: [
            {
                type: "text",
                value: "Prerequisites",
            },
        ],
    }, {
        type: "list",
        ordered: false,
        spread: false,
        children: listItems,
    });
    return [SKIP, index];
};
export const parseSourceCodeLink = (node, index, parent) => {
    const link = node.attributes?.find((attr) => attr.name === "link");
    if (!link) {
        return;
    }
    parent?.children.splice(index, 1, {
        type: "paragraph",
        children: [
            {
                type: "link",
                url: link?.value,
                children: [
                    {
                        type: "text",
                        value: "Source code",
                    },
                ],
            },
        ],
    });
    return [SKIP, index];
};
export const parseTable = (node, index, parent) => {
    const headerNode = node.children?.find((child) => child.name === "Table.Header");
    const bodyNode = node.children?.find((child) => child.name === "Table.Body");
    let nodeText = ``;
    let headerCellsCount = 0;
    headerNode?.children?.forEach((headerRow, rowIndex) => {
        if (rowIndex > 0) {
            nodeText += `\n`;
        }
        const childCells = headerRow.children?.length === 1 &&
            headerRow.children[0].type === "paragraph"
            ? headerRow.children[0].children
            : headerRow.children;
        headerCellsCount = childCells?.length || 0;
        childCells?.forEach((headerCell) => {
            if (headerCell.name !== "Table.HeaderCell") {
                return;
            }
            nodeText += `|`;
            nodeText += formatNodeText(getTextNode(headerCell));
        });
        nodeText += `|`;
    });
    nodeText += `\n|${new Array(headerCellsCount).fill(`---`).join(`|`)}|`;
    bodyNode?.children?.forEach((bodyRow) => {
        nodeText += `\n`;
        bodyRow.children?.forEach((bodyCell) => {
            nodeText += `|`;
            nodeText += formatNodeText(getTextNode(bodyCell));
        });
        nodeText += `|`;
    });
    parent.children?.splice(index, 1, {
        type: "paragraph",
        children: [
            {
                type: "text",
                value: nodeText,
            },
        ],
    });
};
export const parseTabs = (node, index, parent) => {
    if ((node.children?.length || 0) < 2) {
        return;
    }
    const tabs = [];
    node.children[0].children?.forEach((tabList) => {
        tabList.children?.forEach((tabTrigger, index) => {
            const tabContentNode = node.children?.[1].children?.[index];
            const tabLabel = formatNodeText(getTextNode(tabTrigger));
            const tabContent = tabContentNode?.children || [];
            if (!tabLabel || !tabContent) {
                return;
            }
            tabs.push({
                type: "heading",
                depth: 3,
                children: [
                    {
                        type: "text",
                        value: tabLabel,
                    },
                ],
            }, ...tabContent);
        });
    });
    parent.children?.splice(index, 1, ...tabs);
    return [SKIP, index];
};
export const parseTypeList = (node, index, parent) => {
    const types = node.attributes?.find((attr) => attr.name === "types");
    if (!types || typeof types.value === "string" || !types.value.data?.estree) {
        return;
    }
    const typesJsVar = estreeToJs(types.value.data.estree);
    if (!typesJsVar || !Array.isArray(typesJsVar)) {
        return;
    }
    const generateTypeListItems = (typesJsVar) => {
        const listItems = [];
        typesJsVar.forEach((item) => {
            if (!isExpressionJsVarObj(item)) {
                return;
            }
            const typeName = isExpressionJsVarLiteral(item.name) ? item.name.data : "";
            const itemType = isExpressionJsVarLiteral(item.type) ? item.type.data : "";
            const itemDescription = isExpressionJsVarLiteral(item.description)
                ? item.description.data
                : "";
            if (!typeName || !itemType) {
                return;
            }
            const itemListChildren = item.children || [];
            const children = [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: `${typeName}: (${itemType}) ${itemDescription}`.trim(),
                        },
                    ],
                },
            ];
            if (Array.isArray(itemListChildren) && itemListChildren.length) {
                children.push(...generateTypeListItems(itemListChildren));
            }
            listItems.push({
                type: "listItem",
                children,
            });
        });
        return listItems;
    };
    const listItems = generateTypeListItems(typesJsVar);
    parent?.children.splice(index, 1, {
        type: "list",
        ordered: false,
        spread: false,
        children: listItems,
    });
    return [SKIP, index];
};
export const parseWorkflowDiagram = (node, index, parent) => {
    const worflowItems = node.attributes?.find((attr) => attr.name === "workflow");
    if (!worflowItems ||
        typeof worflowItems.value === "string" ||
        !worflowItems.value.data?.estree) {
        return;
    }
    const workflowJsVar = estreeToJs(worflowItems.value.data.estree);
    if (!isExpressionJsVarObj(workflowJsVar) ||
        !("steps" in workflowJsVar) ||
        !Array.isArray(workflowJsVar.steps)) {
        return;
    }
    const generateWorkflowItems = (jsVarItems) => {
        const listItems = [];
        jsVarItems.forEach((item) => {
            if (!isExpressionJsVarObj(item)) {
                return;
            }
            const stepName = isExpressionJsVarLiteral(item.name) ? item.name.data : "";
            const stepDescription = isExpressionJsVarLiteral(item.description)
                ? item.description.data
                : "";
            const stepLink = isExpressionJsVarLiteral(item.link)
                ? item.link.data
                : `#${stepName}`;
            if (!stepName) {
                return;
            }
            const stepChildren = item.steps || [];
            const children = [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "link",
                            url: stepLink,
                            children: [
                                {
                                    type: "text",
                                    value: `${stepName}`,
                                },
                            ],
                        },
                        {
                            type: "text",
                            value: `: ${stepDescription}`,
                        },
                    ],
                },
            ];
            if (Array.isArray(stepChildren) && stepChildren.length) {
                children.push(...generateWorkflowItems(stepChildren));
            }
            listItems.push({
                type: "listItem",
                children,
            });
        });
        return listItems;
    };
    const listItems = generateWorkflowItems(workflowJsVar.steps);
    parent?.children.splice(index, 1, {
        type: "list",
        ordered: false,
        spread: false,
        children: listItems,
    });
    return [SKIP, index];
};
export const parseComponentExample = (node, index, parent, options) => {
    if (!options?.examplesBasePath) {
        return;
    }
    const exampleName = node.attributes?.find((attr) => attr.name === "name");
    if (!exampleName) {
        return;
    }
    const fileContent = readFileSync(path.join(options.examplesBasePath, `${exampleName.value}.tsx`), "utf-8");
    parent.children?.splice(index, 1, {
        type: "code",
        lang: "tsx",
        value: fileContent,
    });
    return [SKIP, index];
};
export const parseComponentReference = (node, index, parent, options) => {
    if (!options?.specsPath) {
        return;
    }
    const mainComponent = node.attributes?.find((attr) => attr.name === "mainComponent")?.value;
    if (!mainComponent) {
        return;
    }
    const componentNames = [];
    const componentsToShowAttr = node.attributes?.find((attr) => attr.name === "componentsToShow");
    if (componentsToShowAttr &&
        typeof componentsToShowAttr.value !== "string" &&
        componentsToShowAttr.value.data?.estree) {
        const componentsToShowJsVar = estreeToJs(componentsToShowAttr.value.data.estree);
        if (componentsToShowAttr && Array.isArray(componentsToShowJsVar)) {
            componentNames.push(...componentsToShowJsVar
                .map((item) => {
                return isExpressionJsVarLiteral(item) ? item.data : "";
            })
                .filter((name) => name.length > 0));
        }
    }
    if (!componentNames.length) {
        componentNames.push(mainComponent);
    }
    const getComponentNodes = (componentName) => {
        const componentSpecsFile = path.join(options.specsPath, mainComponent, `${componentName}.json`);
        const componentSpecs = JSON.parse(readFileSync(componentSpecsFile, "utf-8"));
        const componentNodes = [
            {
                type: "heading",
                depth: 3,
                children: [
                    {
                        type: "text",
                        value: `${componentName} Props`,
                    },
                ],
            },
        ];
        if (componentSpecs.description) {
            componentNodes.push({
                type: "paragraph",
                children: [
                    {
                        type: "text",
                        value: componentSpecs.description,
                    },
                ],
            });
        }
        if (componentSpecs.props) {
            const listNode = {
                type: "list",
                ordered: false,
                spread: false,
                children: [],
            };
            Object.entries(componentSpecs.props).forEach(([propName, propData]) => {
                listNode.children?.push({
                    type: "listItem",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: `${propName}: (${propData.type?.name || propData.tsType?.name}) ${propData.description || ""}${propData.defaultValue ? ` Default: ${propData.defaultValue.value}` : ""}`.trim(),
                                },
                            ],
                        },
                    ],
                });
            });
            componentNodes.push(listNode);
        }
        return componentNodes;
    };
    parent.children?.splice(index, 1, ...componentNames.flatMap(getComponentNodes));
};
export const parsePackageInstall = (node, index, parent) => {
    const packageName = node.attributes?.find((attr) => attr.name === "packageName");
    if (!packageName) {
        return;
    }
    parent.children?.splice(index, 1, {
        type: "code",
        lang: "bash",
        value: `npm install ${packageName.value}`,
    });
    return [SKIP, index];
};
export const parseIconSearch = (node, index, parent, options) => {
    if (!options?.iconNames) {
        return;
    }
    parent.children?.splice(index, 1, {
        type: "list",
        ordered: false,
        spread: false,
        children: options.iconNames.map((iconName) => ({
            type: "listItem",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: iconName,
                        },
                    ],
                },
            ],
        })),
    });
    return [SKIP, index];
};
export const parseHookValues = (node, index, parent, options) => {
    if (!options?.hooksData) {
        return;
    }
    const hookName = node.attributes?.find((attr) => attr.name === "hook");
    if (!hookName ||
        !hookName.value ||
        typeof hookName.value !== "string" ||
        !options.hooksData[hookName.value]) {
        return;
    }
    const hookData = options.hooksData[hookName.value];
    const listItems = hookData.map((item) => {
        return {
            type: "listItem",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: `${item.value}: (${item.type?.type}) ${item.description || ""}`.trim(),
                        },
                    ],
                },
            ],
        };
    });
    parent.children?.splice(index, 1, {
        type: "list",
        ordered: false,
        spread: false,
        children: listItems,
    });
    return [SKIP, index];
};
export const parseColors = (node, index, parent, options) => {
    if (!options?.colors) {
        return;
    }
    parent.children?.splice(index, 1, {
        type: "list",
        ordered: false,
        spread: false,
        children: Object.entries(options.colors).flatMap(([section, colors]) => [
            {
                type: "heading",
                depth: 3,
                children: [
                    {
                        type: "text",
                        value: section,
                    },
                ],
            },
            ...Object.entries(colors).map(([name, value]) => ({
                type: "listItem",
                children: [
                    {
                        type: "paragraph",
                        children: [
                            {
                                type: "text",
                                value: name,
                            },
                            {
                                type: "text",
                                value: `: ${value}`,
                            },
                        ],
                    },
                ],
            })),
        ]),
    });
};
export const parseSplitList = (node, index, parent) => {
    const items = node.attributes?.find((attr) => attr.name === "items");
    if (!items || typeof items.value === "string" || !items.value.data?.estree) {
        return;
    }
    const itemsJsVar = estreeToJs(items.value.data.estree);
    if (!itemsJsVar || !Array.isArray(itemsJsVar)) {
        return;
    }
    const listItems = itemsJsVar
        .map((item) => {
        if (!isExpressionJsVarObj(item) ||
            !("title" in item) ||
            !("link" in item) ||
            !isExpressionJsVarLiteral(item.title) ||
            !isExpressionJsVarLiteral(item.link)) {
            return null;
        }
        const description = isExpressionJsVarLiteral(item.description)
            ? item.description.data
            : "";
        return {
            type: "listItem",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "link",
                            url: `${item.link.data}`,
                            children: [
                                {
                                    type: "text",
                                    value: `${item.title.data}${description ? `: ${description}` : ""}`,
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    })
        .filter(Boolean);
    if (!listItems.length) {
        return;
    }
    parent?.children.splice(index, 1, {
        type: "list",
        ordered: false,
        spread: false,
        children: listItems,
    });
    return [SKIP, index];
};
export const parseEventHeader = (node, index, parent) => {
    const headerContent = node.attributes?.find((attr) => attr.name === "headerProps");
    const headerLvl = node.attributes?.find((attr) => attr.name === "headerLvl");
    if (!headerContent ||
        typeof headerContent.value === "string" ||
        !headerContent.value.data?.estree ||
        !headerLvl ||
        typeof headerLvl.value !== "string" ||
        !headerLvl.value) {
        return;
    }
    const headerPropsJsVar = estreeToJs(headerContent.value.data.estree);
    if (!isExpressionJsVarObj(headerPropsJsVar) ||
        !("children" in headerPropsJsVar) ||
        !isExpressionJsVarLiteral(headerPropsJsVar.children)) {
        return;
    }
    const headerLevel = parseInt(headerLvl.value, 10);
    const headerChildren = headerPropsJsVar.children.data;
    const headerChildrenNode = {
        type: "text",
        value: headerChildren,
    };
    const headerNode = {
        type: "heading",
        depth: headerLevel,
        children: [headerChildrenNode],
    };
    parent?.children.splice(index, 1, headerNode);
    return [SKIP, index];
};
/**
 * Helpers
 */
const getTextNode = (node) => {
    let textNode;
    node.children?.some((child) => {
        if (textNode) {
            return true;
        }
        if (child.type === "text") {
            textNode = child;
        }
        else if (child.type === "paragraph") {
            textNode = getTextNode(child);
        }
        else if (child.type === "link") {
            textNode = getTextNode(child);
        }
        else if (child.value) {
            textNode = child;
        }
        return textNode !== undefined;
    });
    return textNode;
};
const formatNodeText = (node) => {
    if (!node) {
        return "";
    }
    if (node.type === "inlineCode") {
        return `\`${node.value}\``;
    }
    else if (node.type === "code") {
        return `\`\`\`${"lang" in node ? node.lang : "ts"}\n${node.value}\n\`\`\``;
    }
    else if (node.type === "link") {
        return `[${node.children?.[0].value}](${node.url})`;
    }
    return node.value || "";
};
