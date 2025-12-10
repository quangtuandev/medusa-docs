import { componentLinkFixer } from "./utils/component-link-fixer.js";
export function prerequisitesLinkFixerPlugin(options) {
    return componentLinkFixer("Prerequisites", "items", options);
}
