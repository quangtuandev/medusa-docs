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
exports.MermaidDiagram = void 0;
const react_1 = __importStar(require("react"));
const components_1 = require("../../components");
const mermaid_1 = __importDefault(require("mermaid"));
const react_medium_image_zoom_1 = require("react-medium-image-zoom");
require("react-medium-image-zoom/dist/styles.css");
const clsx_1 = __importDefault(require("clsx"));
const VIEWBOX_REGEX = /viewBox="([0-9.-]+\s*){4}"/;
const MermaidDiagram = ({ diagramContent }) => {
    const [result, setResult] = (0, react_1.useState)(null);
    const [isZoomed, setIsZoomed] = (0, react_1.useState)(false);
    const mermaidId = (0, react_1.useRef)(`mermaid-svg-${Math.round(Math.random() * 10000000)}`).current;
    (0, react_1.useEffect)(() => {
        mermaid_1.default.mermaidAPI.initialize();
        mermaid_1.default
            .render(mermaidId, diagramContent)
            .then(setResult)
            .catch((e) => console.error(`An error occurred while rendering Mermaid.js diagram. Content: \n ${diagramContent}\n Error: ${e}`));
    }, [mermaidId, diagramContent]);
    const matchedRegex = (0, react_1.useMemo)(() => {
        return result ? VIEWBOX_REGEX.exec(result.svg) : undefined;
    }, [result]);
    const handleZoomChange = (0, react_1.useCallback)((shouldZoom) => {
        setIsZoomed(shouldZoom);
    }, []);
    return (react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(components_1.Loading, null) },
        react_1.default.createElement(react_medium_image_zoom_1.Controlled, { isZoomed: isZoomed, onZoomChange: handleZoomChange, classDialog: (0, clsx_1.default)("[&_data-rmiz-modal-img]:!top-0 [&_data-rmiz-modal-img]:!left-0 [&_data-rmiz-modal-img]:!transform-x-0", ["[&_data-rmiz-modal-img]:!transform-y-0 [&_data-rmiz-modal-img]:"]) },
            react_1.default.createElement("svg", { dangerouslySetInnerHTML: result ? { __html: result.svg } : undefined, width: isZoomed ? "100vw" : "100%", height: isZoomed
                    ? `100vh`
                    : matchedRegex && matchedRegex.length >= 1
                        ? `${matchedRegex[1]}px`
                        : "100%" }))));
};
exports.MermaidDiagram = MermaidDiagram;
