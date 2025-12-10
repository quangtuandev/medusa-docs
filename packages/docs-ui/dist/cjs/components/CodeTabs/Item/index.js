"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeTab = void 0;
const react_1 = __importDefault(require("react"));
const hooks_1 = require("../../../hooks");
const providers_1 = require("../../../providers");
const clsx_1 = __importDefault(require("clsx"));
const CodeTab = ({ label, value, isSelected = false, blockStyle = "loud", changeSelectedTab, pushRef, }) => {
    const { colorMode } = (0, providers_1.useColorMode)();
    const { blockElementScrollPositionUntilNextRender } = (0, hooks_1.useScrollPositionBlocker)();
    return (react_1.default.createElement("li", null,
        react_1.default.createElement("button", { className: (0, clsx_1.default)("text-compact-x-small-plus font-base xs:border-0 pb-docs_0.5 relative", !isSelected && [
                blockStyle === "loud" && "text-medusa-contrast-fg-secondary",
                blockStyle === "subtle" && [
                    colorMode === "light" &&
                        "text-medusa-fg-subtle hover:bg-medusa-bg-base",
                    colorMode === "dark" &&
                        "text-medusa-contrast-fg-secondary hover:bg-medusa-code-bg-base",
                ],
            ], isSelected && [
                blockStyle === "loud" && "text-medusa-contrast-fg-primary",
                blockStyle === "subtle" && [
                    colorMode === "light" &&
                        "xs:border-medusa-border-base text-medusa-contrast-fg-primary",
                    colorMode === "dark" &&
                        "xs:border-medusa-code-border text-medusa-contrast-fg-primary",
                ],
            ]), ref: (tabButton) => pushRef?.(tabButton), onClick: (e) => {
                blockElementScrollPositionUntilNextRender(e.target);
                changeSelectedTab?.({ label, value });
            }, "aria-selected": isSelected, role: "tab" }, label)));
};
exports.CodeTab = CodeTab;
