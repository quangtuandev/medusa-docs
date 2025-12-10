"use client";
import React, { Suspense } from "react";
import { Loading } from "../..";
import { WorkflowDiagramCanvas } from "./Canvas";
import { WorkflowDiagramList } from "./List";
export const WorkflowDiagram = ({ type = "list", ...props }) => {
    return (React.createElement(Suspense, { fallback: React.createElement(Loading, null) },
        type === "canvas" && React.createElement(WorkflowDiagramCanvas, { ...props }),
        type === "list" && React.createElement(WorkflowDiagramList, { ...props })));
};
