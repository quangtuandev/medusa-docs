import { componentLinkFixer } from "./utils/component-link-fixer.js";
export function typeListLinkFixerPlugin(options) {
    return componentLinkFixer("TypeList", "types", options);
}
