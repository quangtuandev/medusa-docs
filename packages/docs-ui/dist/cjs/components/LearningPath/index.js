"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningPath = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const Icon_1 = require("./Icon");
const utils_1 = require("../../utils");
const providers_1 = require("../../providers");
const components_1 = require("../../components");
const providers_2 = require("../../providers");
const icons_1 = require("@medusajs/icons");
const LearningPath = ({ pathName, className = "", }) => {
    const path = (0, utils_1.getLearningPath)(pathName);
    if (!path) {
        throw new Error(`Learning path ${pathName} does not exist.`);
    }
    const { startPath, path: currentPath } = (0, providers_1.useLearningPath)();
    const notificationContext = (0, providers_2.useNotifications)();
    const handleClick = () => {
        if (notificationContext && currentPath?.notificationId) {
            notificationContext.removeNotification(currentPath.notificationId);
        }
        startPath(path);
    };
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("rounded shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark bg-medusa-bg-subtle mt-docs_1.5 mb-docs_4", className) },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("flex items-center gap-docs_1 p-docs_1 border-0 border-b border-solid border-medusa-border-base") },
            react_1.default.createElement(Icon_1.LearningPathIcon, null),
            react_1.default.createElement("div", { className: (0, clsx_1.default)("basis-3/4") },
                react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-base text-compact-large-plus block") }, path.label),
                path.description && (react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-subtle text-compact-medium mt-docs_0.25 inline-block") }, path.description))),
            react_1.default.createElement(components_1.Button, { onClick: handleClick, className: (0, clsx_1.default)("basis-1/4 max-w-fit") }, "Start Path")),
        path.steps.map((step, index) => (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex items-center p-docs_1 gap-docs_1 relative", index !== path.steps.length - 1 &&
                "border-0 border-b border-solid border-medusa-border-base"), key: index },
            react_1.default.createElement("div", { className: (0, clsx_1.default)("w-docs_3 flex items-center justify-center") },
                react_1.default.createElement(icons_1.CircleMiniSolid, { className: "text-medusa-fg-muted" })),
            react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-base text-compact-medium-plus") }, step.title),
            react_1.default.createElement(components_1.Link, { href: step.path, className: (0, clsx_1.default)("absolute top-0 left-0 w-full h-full") }))))));
};
exports.LearningPath = LearningPath;
