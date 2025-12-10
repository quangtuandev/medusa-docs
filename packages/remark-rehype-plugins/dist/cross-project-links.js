import { estreeToJs } from "docs-utils";
import getAttribute from "./utils/get-attribute.js";
import { performActionOnLiteral } from "./utils/perform-action-on-literal.js";
const PROJECT_REGEX = /^!(?<area>[\w-]+)!/;
function matchAndFixLinks(link, { baseUrl, projectUrls, useBaseUrl = false }) {
    const projectArea = PROJECT_REGEX.exec(link);
    if (!projectArea?.groups?.area) {
        return link;
    }
    const actualUrl = link.replace(PROJECT_REGEX, "");
    const base = !useBaseUrl &&
        projectUrls &&
        Object.hasOwn(projectUrls, projectArea.groups.area) &&
        projectUrls[projectArea.groups.area]?.url
        ? projectUrls[projectArea.groups.area].url
        : baseUrl;
    const path = projectUrls &&
        Object.hasOwn(projectUrls, projectArea.groups.area) &&
        projectUrls[projectArea.groups.area]?.path !== undefined
        ? projectUrls[projectArea.groups.area].path
        : `/${projectArea.groups.area}`;
    return `${base}${path}${actualUrl}`;
}
function linkElmFixer(node, options) {
    if (!node.properties) {
        return;
    }
    node.properties.href = matchAndFixLinks(node.properties.href, options);
}
function linkNodeFixer(node, options) {
    if (!node.url) {
        return;
    }
    node.url = matchAndFixLinks(node.url, options);
}
function componentFixer(node, options) {
    if (!node.name) {
        return;
    }
    let attributeName;
    const maybeCheckAttribute = () => {
        if (!attributeName) {
            return;
        }
        const attribute = getAttribute(node, attributeName);
        if (!attribute) {
            return;
        }
        if (typeof attribute.value === "string") {
            attribute.value = matchAndFixLinks(attribute.value, options);
            return;
        }
        if (!attribute.value.data?.estree) {
            return;
        }
        const itemJsVar = estreeToJs(attribute.value.data.estree);
        if (!itemJsVar) {
            return;
        }
        performActionOnLiteral(itemJsVar, (item) => {
            item.original.value = matchAndFixLinks(item.original.value, options);
            item.original.raw = JSON.stringify(item.original.value);
        });
    };
    switch (node.name) {
        case "CardList":
        case "Prerequisites":
            attributeName = "items";
            break;
        case "Card":
            attributeName = "href";
            break;
        case "WorkflowDiagram":
            attributeName = "workflow";
            break;
        case "TypeList":
            attributeName = "types";
            break;
    }
    maybeCheckAttribute();
}
const allowedComponentNames = [
    "Card",
    "CardList",
    "Prerequisites",
    "WorkflowDiagram",
    "TypeList",
];
export function crossProjectLinksPlugin(options) {
    return async (tree) => {
        const { visit } = await import("unist-util-visit");
        visit(tree, ["element", "mdxJsxFlowElement", "link"], (node) => {
            const isComponent = node.name && allowedComponentNames.includes(node.name);
            const isLinkElm = node.tagName === "a" && node.properties?.href;
            const isLinkNode = node.type === "link" && node.url;
            if (!isComponent && !isLinkElm && !isLinkNode) {
                return;
            }
            if (isComponent) {
                componentFixer(node, options);
            }
            else if (isLinkElm) {
                linkElmFixer(node, options);
            }
            else {
                linkNodeFixer(node, options);
            }
        });
    };
}
