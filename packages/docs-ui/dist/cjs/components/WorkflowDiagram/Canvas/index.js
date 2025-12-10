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
exports.WorkflowDiagramCanvas = void 0;
const clsx_1 = __importDefault(require("clsx"));
const framer_motion_1 = require("framer-motion");
const react_1 = __importStar(require("react"));
const icons_1 = require("@medusajs/icons");
const ui_1 = require("@medusajs/ui");
const utils_1 = require("../../../utils");
const Depth_1 = require("./Depth");
const defaultState = {
    x: -1000,
    y: -1020,
    scale: 1,
};
const MAX_ZOOM = 1.5;
const MIN_ZOOM = 0.5;
const ZOOM_STEP = 0.25;
const WorkflowDiagramCanvas = ({ workflow, }) => {
    const [zoom, setZoom] = (0, react_1.useState)(1);
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    const scale = (0, framer_motion_1.useMotionValue)(defaultState.scale);
    const x = (0, framer_motion_1.useMotionValue)(defaultState.x);
    const y = (0, framer_motion_1.useMotionValue)(defaultState.y);
    const controls = (0, framer_motion_1.useAnimationControls)();
    const dragControls = (0, framer_motion_1.useDragControls)();
    const dragConstraints = (0, react_1.useRef)(null);
    const canZoomIn = zoom < MAX_ZOOM;
    const canZoomOut = zoom > MIN_ZOOM;
    (0, react_1.useEffect)(() => {
        const unsubscribe = scale.on("change", (latest) => {
            setZoom(latest);
        });
        return () => {
            unsubscribe();
        };
    }, [scale]);
    const clusters = (0, utils_1.createNodeClusters)(workflow.steps);
    function scaleXandY(prevScale, newScale, x, y) {
        const scaleRatio = newScale / prevScale;
        return {
            x: x * scaleRatio,
            y: y * scaleRatio,
        };
    }
    const changeZoom = (newScale) => {
        const { x: newX, y: newY } = scaleXandY(zoom, newScale, x.get(), y.get());
        setZoom(newScale);
        controls.set({ scale: newScale, x: newX, y: newY });
    };
    const zoomIn = () => {
        const curr = scale.get();
        if (curr < 1.5) {
            const newScale = curr + ZOOM_STEP;
            changeZoom(newScale);
        }
    };
    const zoomOut = () => {
        const curr = scale.get();
        if (curr > 0.5) {
            const newScale = curr - ZOOM_STEP;
            changeZoom(newScale);
        }
    };
    const resetCanvas = async () => await controls.start(defaultState);
    return (react_1.default.createElement("div", { className: "h-[200px] w-full rounded-docs_DEFAULT" },
        react_1.default.createElement("div", { ref: dragConstraints, className: "relative size-full rounded-docs_DEFAULT" },
            react_1.default.createElement("div", { className: "relative size-full overflow-hidden object-contain rounded-docs_DEFAULT shadow-elevation-card-rest" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement(framer_motion_1.motion.div
                    // @ts-expect-error React v19 isn't recognizing accepted props
                    , { 
                        // @ts-expect-error React v19 isn't recognizing accepted props
                        onMouseDown: () => setIsDragging(true), onMouseUp: () => setIsDragging(false), drag: true, dragConstraints: dragConstraints, dragElastic: 0, dragMomentum: false, dragControls: dragControls, initial: false, animate: controls, transition: { duration: 0.25 }, style: {
                            x,
                            y,
                            scale,
                        }, className: (0, clsx_1.default)("bg-medusa-bg-subtle relative size-[500rem] origin-top-left items-start justify-start overflow-hidden", "bg-[radial-gradient(var(--docs-border-base)_1.5px,transparent_0)] bg-[length:20px_20px] bg-repeat", !isDragging && "cursor-grab", isDragging && "cursor-grabbing") },
                        react_1.default.createElement("main", { className: "size-full" },
                            react_1.default.createElement("div", { className: "absolute left-[1100px] top-[1100px] flex select-none items-start" }, Object.entries(clusters).map(([depth, cluster]) => {
                                const next = (0, utils_1.getNextCluster)(clusters, Number(depth));
                                return (react_1.default.createElement(Depth_1.WorkflowDiagramCanvasDepth, { cluster: cluster, next: next, key: depth }));
                            })))))),
            react_1.default.createElement("div", { className: "bg-medusa-bg-base shadow-borders-base text-medusa-fg-subtle absolute bottom-docs_1 left-docs_1.5 flex h-[28px] items-center overflow-hidden rounded-docs_sm" },
                react_1.default.createElement("div", { className: "flex items-center" },
                    react_1.default.createElement("button", { onClick: zoomIn, type: "button", disabled: !canZoomIn, "aria-label": "Zoom in", className: "disabled:text-medusa-fg-disabled transition-fg hover:bg-medusa-bg-base-hover active:bg-medusa-bg-base-pressed focus-visible:bg-medusa-bg-base-pressed border-r p-docs_0.25 outline-none" },
                        react_1.default.createElement(icons_1.PlusMini, null)),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(ui_1.DropdownMenu, null,
                            react_1.default.createElement(ui_1.DropdownMenu.Trigger, { className: "disabled:text-medusa-fg-disabled transition-fg hover:bg-medusa-bg-base-hover active:bg-medusa-bg-base-pressed focus-visible:bg-medusa-bg-base-pressed flex w-[50px] items-center justify-center border-r p-docs_0.25 outline-none" },
                                react_1.default.createElement(ui_1.Text, { as: "span", size: "xsmall", leading: "compact", className: "select-none tabular-nums" },
                                    Math.round(zoom * 100),
                                    "%")),
                            react_1.default.createElement(ui_1.DropdownMenu.Content, { className: "bg-medusa-bg-base" }, [50, 75, 100, 125, 150].map((value) => (react_1.default.createElement(ui_1.DropdownMenu.Item, { key: value, onClick: () => changeZoom(value / 100), className: "px-docs_0.5 py-[6px]" },
                                value,
                                "%")))))),
                    react_1.default.createElement("button", { onClick: zoomOut, type: "button", disabled: !canZoomOut, "aria-label": "Zoom out", className: "disabled:text-medusa-fg-disabled transition-fg hover:bg-medusa-bg-base-hover active:bg-medusa-bg-base-pressed focus-visible:bg-medusa-bg-base-pressed border-r p-docs_0.25 outline-none" },
                        react_1.default.createElement(icons_1.MinusMini, null))),
                react_1.default.createElement("button", { onClick: resetCanvas, type: "button", "aria-label": "Reset canvas", className: "disabled:text-medusa-fg-disabled transition-fg hover:bg-medusa-bg-base-hover active:bg-medusa-bg-base-pressed focus-visible:bg-medusa-bg-base-pressed p-docs_0.25 outline-none" },
                    react_1.default.createElement(icons_1.ArrowPathMini, null))))));
};
exports.WorkflowDiagramCanvas = WorkflowDiagramCanvas;
