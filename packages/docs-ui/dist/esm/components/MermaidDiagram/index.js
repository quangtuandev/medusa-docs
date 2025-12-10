"use client";
import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState, } from "react";
import { Loading } from "../../components";
import mermaid from "mermaid";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import clsx from "clsx";
const VIEWBOX_REGEX = /viewBox="([0-9.-]+\s*){4}"/;
export const MermaidDiagram = ({ diagramContent }) => {
    const [result, setResult] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const mermaidId = useRef(`mermaid-svg-${Math.round(Math.random() * 10000000)}`).current;
    useEffect(() => {
        mermaid.mermaidAPI.initialize();
        mermaid
            .render(mermaidId, diagramContent)
            .then(setResult)
            .catch((e) => console.error(`An error occurred while rendering Mermaid.js diagram. Content: \n ${diagramContent}\n Error: ${e}`));
    }, [mermaidId, diagramContent]);
    const matchedRegex = useMemo(() => {
        return result ? VIEWBOX_REGEX.exec(result.svg) : undefined;
    }, [result]);
    const handleZoomChange = useCallback((shouldZoom) => {
        setIsZoomed(shouldZoom);
    }, []);
    return (React.createElement(Suspense, { fallback: React.createElement(Loading, null) },
        React.createElement(ControlledZoom, { isZoomed: isZoomed, onZoomChange: handleZoomChange, classDialog: clsx("[&_data-rmiz-modal-img]:!top-0 [&_data-rmiz-modal-img]:!left-0 [&_data-rmiz-modal-img]:!transform-x-0", ["[&_data-rmiz-modal-img]:!transform-y-0 [&_data-rmiz-modal-img]:"]) },
            React.createElement("svg", { dangerouslySetInnerHTML: result ? { __html: result.svg } : undefined, width: isZoomed ? "100vw" : "100%", height: isZoomed
                    ? `100vh`
                    : matchedRegex && matchedRegex.length >= 1
                        ? `${matchedRegex[1]}px`
                        : "100%" }))));
};
