export function recmaInjectMdxDataPlugin(options) {
    const isRemoteMdx = options?.isRemoteMdx || false;
    const mode = options?.mode || "development";
    return async (tree, file) => {
        const frontmatter = file.data.matter || {};
        const tocMaxDepth = frontmatter.toc_max_depth || 4;
        let dataToc = (file.data.toc || []);
        if (dataToc.length > 0 && dataToc[0].depth === 1) {
            dataToc = (dataToc[0].children || []);
        }
        const toc = frontmatter.generate_toc
            ? []
            : getToc(dataToc, tocMaxDepth);
        const program = tree;
        for (const node of program.body) {
            if (node.type === "FunctionDeclaration") {
                const fnNode = node;
                const returnStatement = fnNode.body.body.find((n) => n.type === "ReturnStatement");
                if (!returnStatement) {
                    continue;
                }
                const returnChildren = getReturnChildren(returnStatement);
                if (isRemoteMdx) {
                    handleRemoteMdx({
                        returnChildren,
                        frontmatter,
                        toc,
                        mode,
                    });
                }
                else {
                    handleDefaultMdx({
                        program,
                        returnChildren,
                        frontmatter,
                        toc,
                    });
                }
                return;
            }
        }
    };
}
function handleDefaultMdx({ program, returnChildren, frontmatter, toc, }) {
    program.body.unshift({
        type: "ImportDeclaration",
        source: { type: "Literal", value: "docs-ui" },
        specifiers: [
            {
                type: "ImportSpecifier",
                imported: { type: "Identifier", name: "InjectedMDXData" },
                local: { type: "Identifier", name: "InjectedMDXData" },
            },
        ],
    });
    returnChildren.push({
        type: "JSXElement",
        openingElement: {
            type: "JSXOpeningElement",
            name: {
                type: "JSXIdentifier",
                name: "InjectedMDXData",
            },
            attributes: [
                {
                    type: "JSXAttribute",
                    name: {
                        type: "JSXIdentifier",
                        name: "frontmatter",
                    },
                    value: {
                        type: "JSXExpressionContainer",
                        expression: {
                            type: "ObjectExpression",
                            properties: Object.entries(frontmatter).map(([key, value]) => ({
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: key,
                                },
                                value: {
                                    type: "Literal",
                                    value: value,
                                    raw: JSON.stringify(value),
                                },
                                kind: "init",
                                computed: false,
                                method: false,
                                shorthand: false,
                            })),
                        },
                    },
                },
                {
                    type: "JSXAttribute",
                    name: {
                        type: "JSXIdentifier",
                        name: "toc",
                    },
                    value: {
                        type: "JSXExpressionContainer",
                        expression: {
                            type: "ArrayExpression",
                            elements: getTocJSX(toc),
                        },
                    },
                },
            ],
            selfClosing: true,
        },
    });
}
function handleRemoteMdx({ returnChildren, frontmatter, toc, mode, }) {
    const functionName = mode === "development" ? "_jsxDEV" : "_jsx";
    returnChildren.push({
        type: "Literal",
        value: "\n",
    });
    returnChildren.push({
        type: "CallExpression",
        callee: {
            type: "Identifier",
            name: functionName,
        },
        arguments: [
            {
                type: "MemberExpression",
                object: {
                    type: "Identifier",
                    name: "_components",
                },
                property: {
                    type: "Identifier",
                    name: "InjectedMDXData",
                },
                computed: false,
                optional: false,
                shorthand: false,
            },
            {
                type: "ObjectExpression",
                properties: [
                    {
                        type: "Property",
                        key: { type: "Identifier", name: "frontmatter" },
                        value: {
                            type: "ObjectExpression",
                            properties: Object.entries(frontmatter).map(([key, value]) => ({
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: key,
                                },
                                value: {
                                    type: "Literal",
                                    value: value,
                                    raw: JSON.stringify(value),
                                },
                                kind: "init",
                                computed: false,
                                optional: false,
                                shorthand: false,
                            })),
                        },
                        kind: "init",
                        computed: false,
                        optional: false,
                        shorthand: false,
                    },
                    {
                        type: "Property",
                        key: { type: "Identifier", name: "toc" },
                        value: {
                            type: "ArrayExpression",
                            elements: getTocJSX(toc),
                        },
                        kind: "init",
                        computed: false,
                        optional: false,
                        shorthand: false,
                    },
                ],
            },
        ],
    });
}
function getReturnChildren(node) {
    const rootJSX = node.argument;
    if (rootJSX.type === "JSXFragment") {
        return rootJSX.children;
    }
    else if (rootJSX.type === "JSXElement") {
        return [];
    }
    const props = rootJSX.arguments.find((arg) => arg.type === "ObjectExpression");
    if (!props) {
        return [];
    }
    const childrenProp = props.properties.find((prop) => prop.key.name === "children");
    if (!childrenProp || childrenProp.value.type !== "ArrayExpression") {
        return [];
    }
    return childrenProp.value.elements;
}
function getToc(items, maxDepth) {
    const toc = [];
    items.forEach((i) => {
        const depth = i.depth;
        if (depth > maxDepth) {
            return;
        }
        const tocItem = {
            title: i.value,
            level: depth,
            id: i.id,
            children: [],
        };
        if (i.children && Array.isArray(i.children) && i.children.length > 0) {
            tocItem.children = getToc(i.children, maxDepth);
        }
        toc.push(tocItem);
    });
    return toc;
}
function getTocJSX(toc) {
    return toc.map((item) => {
        const itemData = {
            type: "ObjectExpression",
            properties: [
                {
                    type: "Property",
                    key: { type: "Identifier", name: "title" },
                    value: { type: "Literal", value: item.title },
                    kind: "init",
                    computed: false,
                    method: false,
                    shorthand: false,
                },
                {
                    type: "Property",
                    key: { type: "Identifier", name: "level" },
                    value: { type: "Literal", value: item.level },
                    kind: "init",
                    computed: false,
                    method: false,
                    shorthand: false,
                },
                {
                    type: "Property",
                    key: { type: "Identifier", name: "id" },
                    value: { type: "Literal", value: item.id },
                    kind: "init",
                    computed: false,
                    method: false,
                    shorthand: false,
                },
            ],
        };
        if (item.children && item.children.length > 0) {
            itemData.properties.push({
                type: "Property",
                key: { type: "Identifier", name: "children" },
                value: {
                    type: "ArrayExpression",
                    elements: getTocJSX(item.children),
                },
                kind: "init",
                computed: false,
                method: false,
                shorthand: false,
            });
        }
        return itemData;
    });
}
