import { componentLinkFixer } from "./utils/component-link-fixer.js";
export function workflowDiagramLinkFixerPlugin(options) {
    return componentLinkFixer("WorkflowDiagram", "workflow", options);
}
