"use strict";
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
exports.LearningPathSteps = void 0;
const providers_1 = require("../../../providers");
const react_1 = __importStar(require("react"));
const Actions_1 = require("./Actions");
const clsx_1 = __importDefault(require("clsx"));
const Icons_1 = require("../../../components/Icons");
const icons_1 = require("@medusajs/icons");
const components_1 = require("../../../components");
// @ts-expect-error can't install the types package because it doesn't support React v19
const react_transition_group_1 = require("react-transition-group");
const LearningPathSteps = ({ ...rest }) => {
    const { path, currentStep, goToStep } = (0, providers_1.useLearningPath)();
    const [collapsed, setCollapsed] = (0, react_1.useState)(false);
    const stepsRef = (0, react_1.useRef)(null);
    const buttonRef = (0, react_1.useRef)(null);
    const nodeRef = collapsed ? buttonRef : stepsRef;
    const handleScroll = (0, react_1.useCallback)(() => {
        if (window.scrollY > 100 && !collapsed) {
            // automatically collapse steps
            setCollapsed(true);
        }
        else if ((window.scrollY === 0 ||
            window.scrollY + window.innerHeight >= document.body.scrollHeight) &&
            collapsed) {
            // automatically open steps
            setCollapsed(false);
        }
    }, [collapsed]);
    (0, react_1.useEffect)(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);
    if (!path) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement(react_transition_group_1.SwitchTransition, null,
        react_1.default.createElement(react_transition_group_1.CSSTransition, { key: collapsed ? "show_path" : "show_button", nodeRef: nodeRef, timeout: 300, addEndListener: (done) => {
                nodeRef.current?.addEventListener("transitionend", done, false);
            }, classNames: {
                enter: "animate-maximize animate-fast",
                exit: "animate-minimize animate-fast",
            } },
            react_1.default.createElement(react_1.default.Fragment, null,
                !collapsed && (react_1.default.createElement("div", { className: (0, clsx_1.default)("bg-medusa-bg-base shadow-elevation-flyout dark:shadow-elevation-flyout-dark rounded", "transition-transform origin-bottom-right flex flex-col"), ref: stepsRef },
                    react_1.default.createElement("div", { className: "overflow-auto basis-3/4" }, path.steps.map((step, index) => (react_1.default.createElement("div", { className: (0, clsx_1.default)("border-0 border-b border-solid border-medusa-border-base", "relative p-docs_1"), key: index },
                        react_1.default.createElement("div", { className: (0, clsx_1.default)("flex items-center gap-docs_1 relative") },
                            react_1.default.createElement("div", { className: "w-docs_2 flex-none flex items-center justify-center" },
                                index === currentStep && (react_1.default.createElement(Icons_1.IconCircleDottedLine, { className: (0, clsx_1.default)("shadow-active dark:shadow-active-dark rounded-full", "!text-ui-fg-interactive") })),
                                index < currentStep && (react_1.default.createElement(icons_1.CheckCircleSolid, { className: "text-ui-fg-interactive" })),
                                index > currentStep && (react_1.default.createElement(icons_1.CircleMiniSolid, { className: "text-ui-fg-subtle" }))),
                            react_1.default.createElement("span", { className: (0, clsx_1.default)("text-compact-medium-plus text-medusa-fg-base") }, step.title),
                            react_1.default.createElement(components_1.Link, { href: step.path, className: (0, clsx_1.default)("absolute top-0 left-0 w-full h-full"), onClick: (e) => {
                                    e.preventDefault();
                                    goToStep(index);
                                } })),
                        index === currentStep && (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex items-center gap-docs_1") },
                            react_1.default.createElement("div", { className: "w-docs_2 flex-none" }),
                            react_1.default.createElement("div", { className: (0, clsx_1.default)("text-medium text-ui-fg-subtle mt-docs_1") }, step.descriptionJSX ??
                                step.description))))))),
                    react_1.default.createElement(Actions_1.LearningPathStepActions, { setCollapsed: setCollapsed, ...rest }))),
                collapsed && (react_1.default.createElement(components_1.Button, { variant: "secondary", className: (0, clsx_1.default)("!p-[10px] !shadow-elevation-flyout dark:!shadow-elevation-flyout-dark !text-medusa-fg-subtle w-fit h-fit", "rounded-full border-0 mr-0 ml-auto fixed md:relative max-[767px]:bottom-docs_1 max-[767px]:right-docs_1 "), onClick: () => setCollapsed(false), buttonRef: buttonRef },
                    react_1.default.createElement(icons_1.ListBullet, null),
                    react_1.default.createElement(components_1.Badge, { variant: "blue", className: (0, clsx_1.default)("absolute -top-docs_0.25 -right-docs_0.25") }, "!")))))));
};
exports.LearningPathSteps = LearningPathSteps;
