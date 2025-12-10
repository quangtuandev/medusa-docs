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
exports.NoteLayout = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const __1 = require("../../..");
const PUNCTIONATIONS = [".", ":", ";", ",", "!", "?"];
const NoteLayout = ({ type, title, children, forceMultiline = false, }) => {
    const getStringInfoFromChildren = (nodes) => {
        let allStringChildren = true;
        const stringChildren = [];
        react_1.default.Children.forEach(nodes, (child) => {
            if (!allStringChildren) {
                return;
            }
            else if (["string", "number"].includes(typeof child)) {
                stringChildren.push(`${child}`);
            }
            else if (Array.isArray(child)) {
                const childInfo = getStringInfoFromChildren(child);
                allStringChildren = childInfo.allStringChildren;
                stringChildren.push(...childInfo.stringChildren);
            }
            else if (react_1.default.isValidElement(child) &&
                typeof child.props === "object" &&
                child.props &&
                "children" in child.props &&
                child.props.children) {
                const typeStr = child.type.toString();
                if (typeStr.includes(`"li"`)) {
                    allStringChildren = false;
                    return;
                }
                else if ("href" in child.props &&
                    typeof child.props.children === "string") {
                    stringChildren.push(`[${child.props.children}](${child.props.href})`);
                    return;
                }
                else if (typeStr.includes("InlineCode") &&
                    typeof child.props.children === "string") {
                    stringChildren.push(`\`${child.props.children}\``);
                    return;
                }
                const childInfo = getStringInfoFromChildren(child.props.children);
                allStringChildren = childInfo.allStringChildren;
                stringChildren.push(...childInfo.stringChildren);
            }
        });
        return {
            allStringChildren,
            stringChildren,
        };
    };
    const { allStringChildren, stringChildren } = (0, react_1.useMemo)(() => {
        if (forceMultiline) {
            return {
                allStringChildren: false,
                stringChildren: "",
            };
        }
        const { allStringChildren, stringChildren } = getStringInfoFromChildren(children);
        return {
            allStringChildren,
            stringChildren: stringChildren.join(""),
        };
    }, [children, forceMultiline]);
    const showColon = (0, react_1.useMemo)(() => {
        const lastChar = title?.charAt(title.length - 1) || "";
        return !PUNCTIONATIONS.includes(lastChar);
    }, [title]);
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("py-[10px] px-docs_0.75 my-docs_1", "flex gap-docs_0.75 rounded-docs_DEFAULT items-stretch", "bg-medusa-bg-component border border-medusa-border-base") },
        react_1.default.createElement("span", { className: (0, clsx_1.default)("rounded-full w-docs_0.25", 
            // TODO remove once we use the new prerequisites component across docs
            (type === "default" || type === "check") &&
                "bg-medusa-tag-neutral-icon", (type === "error" || type === "warning") && "bg-medusa-tag-red-icon", type === "success" && "bg-medusa-tag-green-icon", 
            // TODO remove once all soon components are removed
            type === "soon" && "bg-medusa-tag-blue-icon") }),
        react_1.default.createElement("div", { className: "flex-1" },
            react_1.default.createElement("div", { className: "text-small text-medusa-fg-subtle [&_ol]:!mb-0 [&_ul]:!mb-0" },
                react_1.default.createElement("span", { className: (0, clsx_1.default)("text-small-plus text-medusa-fg-base") },
                    title,
                    showColon ? ":" : "",
                    "\u00A0"),
                allStringChildren && (react_1.default.createElement(__1.MarkdownContent, { allowedElements: ["a", "code"], unwrapDisallowed: true }, stringChildren)),
                !allStringChildren && children))));
};
exports.NoteLayout = NoteLayout;
