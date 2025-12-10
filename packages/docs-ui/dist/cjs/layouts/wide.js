"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WideLayout = void 0;
const react_1 = __importDefault(require("react"));
const root_1 = require("./root");
const clsx_1 = __importDefault(require("clsx"));
const __1 = require("..");
const WideLayout = ({ children, footerComponent, showBreadcrumbs = true, ...props }) => {
    return (react_1.default.createElement(root_1.RootLayout, { ...props, mainWrapperClasses: (0, clsx_1.default)(props.mainWrapperClasses, "mx-auto flex"), contentClassName: "w-full" },
        react_1.default.createElement("main", { className: (0, clsx_1.default)("relative mt-4 w-full flex-1 lg:mt-7") },
            showBreadcrumbs && react_1.default.createElement(__1.Breadcrumbs, null),
            children,
            footerComponent)));
};
exports.WideLayout = WideLayout;
