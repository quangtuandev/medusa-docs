"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabsContent = exports.TabsContentWrapper = exports.TabsTriggerVertical = exports.TabsTrigger = exports.TabsList = exports.Tabs = void 0;
const react_1 = __importStar(require("react"));
const ui_1 = require("@medusajs/ui");
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const __1 = require("../..");
const Tabs = ({ layoutType = "horizontal", className, ...props }) => {
    const { isMobile } = (0, __1.useMobile)();
    const layout = (0, react_1.useMemo)(() => {
        return isMobile ? "horizontal" : layoutType;
    }, [layoutType, isMobile]);
    return (react_1.default.createElement(ui_1.Tabs, { ...props, className: (0, clsx_1.default)(className, layout === "vertical" && [
            "flex gap-docs_1",
            "[&_[role=tablist]]:flex-col [&_[role=tablist]]:items-start",
            "[&_[role=tablist]+*]:flex-1 [&_[role=tablist]+*]:!mt-0",
            "[&_[role=tablist]+*]:w-3/4 [&_[role=tablist]]:w-1/4",
        ]) }));
};
exports.Tabs = Tabs;
const TabsList = ({ className, ...props }) => (react_1.default.createElement(ui_1.Tabs.List, { ...props, className: (0, clsx_1.default)(className, "gap-docs_0.5") }));
exports.TabsList = TabsList;
const TabsTrigger = ({ className, ...props }) => (react_1.default.createElement(ui_1.Tabs.Trigger, { ...props, className: (0, clsx_1.default)(className, "px-[10px] py-docs_0.25 data-[state=active]:text-ui-fg-base data-[state=active]:bg-ui-bg-base data-[state=active]:shadow-elevation-card-rest", "hover:text-ui-fg-base focus-visible:border-ui-border-interactive focus-visible:!shadow-borders-focus focus-visible:bg-ui-bg-base") }));
exports.TabsTrigger = TabsTrigger;
const TabsTriggerVertical = ({ className, children, ...props }) => {
    const { isMobile } = (0, __1.useMobile)();
    if (isMobile) {
        return (react_1.default.createElement(exports.TabsTrigger, { className: className, ...props }, children));
    }
    return (react_1.default.createElement(ui_1.Tabs.Trigger, { ...props, className: (0, clsx_1.default)(className, "px-docs_0.5 py-docs_0.25 !text-medusa-fg-base text-compact-small data-[state=active]:!text-compact-small-plus", "[&[data-state=active]_svg]:!visible hover:!bg-medusa-bg-base-hover rounded-docs_DEFAULT", "!shadow-none") },
        react_1.default.createElement(icons_1.EllipseMiniSolid, { className: "invisible" }),
        children));
};
exports.TabsTriggerVertical = TabsTriggerVertical;
const TabsContentWrapper = ({ className, ...props }) => (react_1.default.createElement("div", { ...props, className: (0, clsx_1.default)(className, "mt-docs_0.5") }));
exports.TabsContentWrapper = TabsContentWrapper;
const TabsContent = (props) => (react_1.default.createElement(ui_1.Tabs.Content, { ...props }));
exports.TabsContent = TabsContent;
