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
exports.useLayout = exports.LayoutProvider = exports.LayoutProviderContext = void 0;
const resize_observer_1 = __importDefault(require("@react-hook/resize-observer"));
const react_1 = __importStar(require("react"));
exports.LayoutProviderContext = (0, react_1.createContext)(null);
const LayoutProvider = ({ children, disableResizeObserver = false, }) => {
    const mainContentRef = (0, react_1.createRef)();
    const [showCollapsedNavbar, setShowCollapsedNavbar] = (0, react_1.useState)(false);
    (0, resize_observer_1.default)(mainContentRef, () => {
        if (disableResizeObserver || window.innerWidth < 1024) {
            setShowCollapsedNavbar(false);
            return;
        }
        if (mainContentRef.current) {
            setShowCollapsedNavbar(mainContentRef.current.clientWidth < 1100);
        }
    });
    return (react_1.default.createElement(exports.LayoutProviderContext.Provider, { value: { mainContentRef, showCollapsedNavbar } }, children));
};
exports.LayoutProvider = LayoutProvider;
const useLayout = () => {
    const context = (0, react_1.useContext)(exports.LayoutProviderContext);
    if (!context) {
        throw new Error("useLayout must be used inside a LayoutProvider");
    }
    return context;
};
exports.useLayout = useLayout;
