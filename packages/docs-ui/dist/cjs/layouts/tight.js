"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TightLayout = void 0;
const react_1 = __importDefault(require("react"));
const root_1 = require("./root");
const clsx_1 = __importDefault(require("clsx"));
const __1 = require("..");
const TightLayout = ({ children, footerComponent, showBreadcrumbs = true, ...props }) => {
    return (react_1.default.createElement(root_1.RootLayout, { ...props },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("w-full h-fit", "max-w-inner-content-xs sm:max-w-inner-content-sm md:max-w-inner-content-md", "lg:max-w-inner-content-lg xl:max-w-inner-content-xl xxl:max-w-inner-content-xxl", "xxxl:max-w-inner-content-xxxl", "px-docs_1 md:px-docs_4 lg:px-0") },
            showBreadcrumbs && react_1.default.createElement(__1.Breadcrumbs, null),
            children,
            footerComponent)));
};
exports.TightLayout = TightLayout;
