"use client";
import clsx from "clsx";
import { useAnimationControls, useDragControls, useMotionValue, motion, } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { ArrowPathMini, MinusMini, PlusMini } from "@medusajs/icons";
import { DropdownMenu, Text } from "@medusajs/ui";
import { createNodeClusters, getNextCluster } from "../../../utils";
import { WorkflowDiagramCanvasDepth } from "./Depth";
const defaultState = {
    x: -1000,
    y: -1020,
    scale: 1,
};
const MAX_ZOOM = 1.5;
const MIN_ZOOM = 0.5;
const ZOOM_STEP = 0.25;
export const WorkflowDiagramCanvas = ({ workflow, }) => {
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const scale = useMotionValue(defaultState.scale);
    const x = useMotionValue(defaultState.x);
    const y = useMotionValue(defaultState.y);
    const controls = useAnimationControls();
    const dragControls = useDragControls();
    const dragConstraints = useRef(null);
    const canZoomIn = zoom < MAX_ZOOM;
    const canZoomOut = zoom > MIN_ZOOM;
    useEffect(() => {
        const unsubscribe = scale.on("change", (latest) => {
            setZoom(latest);
        });
        return () => {
            unsubscribe();
        };
    }, [scale]);
    const clusters = createNodeClusters(workflow.steps);
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
    return (React.createElement("div", { className: "h-[200px] w-full rounded-docs_DEFAULT" },
        React.createElement("div", { ref: dragConstraints, className: "relative size-full rounded-docs_DEFAULT" },
            React.createElement("div", { className: "relative size-full overflow-hidden object-contain rounded-docs_DEFAULT shadow-elevation-card-rest" },
                React.createElement("div", null,
                    React.createElement(motion.div
                    // @ts-expect-error React v19 isn't recognizing accepted props
                    , { 
                        // @ts-expect-error React v19 isn't recognizing accepted props
                        onMouseDown: () => setIsDragging(true), onMouseUp: () => setIsDragging(false), drag: true, dragConstraints: dragConstraints, dragElastic: 0, dragMomentum: false, dragControls: dragControls, initial: false, animate: controls, transition: { duration: 0.25 }, style: {
                            x,
                            y,
                            scale,
                        }, className: clsx("bg-medusa-bg-subtle relative size-[500rem] origin-top-left items-start justify-start overflow-hidden", "bg-[radial-gradient(var(--docs-border-base)_1.5px,transparent_0)] bg-[length:20px_20px] bg-repeat", !isDragging && "cursor-grab", isDragging && "cursor-grabbing") },
                        React.createElement("main", { className: "size-full" },
                            React.createElement("div", { className: "absolute left-[1100px] top-[1100px] flex select-none items-start" }, Object.entries(clusters).map(([depth, cluster]) => {
                                const next = getNextCluster(clusters, Number(depth));
                                return (React.createElement(WorkflowDiagramCanvasDepth, { cluster: cluster, next: next, key: depth }));
                            })))))),
            React.createElement("div", { className: "bg-medusa-bg-base shadow-borders-base text-medusa-fg-subtle absolute bottom-docs_1 left-docs_1.5 flex h-[28px] items-center overflow-hidden rounded-docs_sm" },
                React.createElement("div", { className: "flex items-center" },
                    React.createElement("button", { onClick: zoomIn, type: "button", disabled: !canZoomIn, "aria-label": "Zoom in", className: "disabled:text-medusa-fg-disabled transition-fg hover:bg-medusa-bg-base-hover active:bg-medusa-bg-base-pressed focus-visible:bg-medusa-bg-base-pressed border-r p-docs_0.25 outline-none" },
                        React.createElement(PlusMini, null)),
                    React.createElement("div", null,
                        React.createElement(DropdownMenu, null,
                            React.createElement(DropdownMenu.Trigger, { className: "disabled:text-medusa-fg-disabled transition-fg hover:bg-medusa-bg-base-hover active:bg-medusa-bg-base-pressed focus-visible:bg-medusa-bg-base-pressed flex w-[50px] items-center justify-center border-r p-docs_0.25 outline-none" },
                                React.createElement(Text, { as: "span", size: "xsmall", leading: "compact", className: "select-none tabular-nums" },
                                    Math.round(zoom * 100),
                                    "%")),
                            React.createElement(DropdownMenu.Content, { className: "bg-medusa-bg-base" }, [50, 75, 100, 125, 150].map((value) => (React.createElement(DropdownMenu.Item, { key: value, onClick: () => changeZoom(value / 100), className: "px-docs_0.5 py-[6px]" },
                                value,
                                "%")))))),
                    React.createElement("button", { onClick: zoomOut, type: "button", disabled: !canZoomOut, "aria-label": "Zoom out", className: "disabled:text-medusa-fg-disabled transition-fg hover:bg-medusa-bg-base-hover active:bg-medusa-bg-base-pressed focus-visible:bg-medusa-bg-base-pressed border-r p-docs_0.25 outline-none" },
                        React.createElement(MinusMini, null))),
                React.createElement("button", { onClick: resetCanvas, type: "button", "aria-label": "Reset canvas", className: "disabled:text-medusa-fg-disabled transition-fg hover:bg-medusa-bg-base-hover active:bg-medusa-bg-base-pressed focus-visible:bg-medusa-bg-base-pressed p-docs_0.25 outline-none" },
                    React.createElement(ArrowPathMini, null))))));
};
