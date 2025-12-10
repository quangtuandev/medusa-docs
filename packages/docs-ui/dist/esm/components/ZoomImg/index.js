"use client";
import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
export const ZoomImg = (props) => {
    return (React.createElement(Zoom, { wrapElement: "span" },
        React.createElement("img", { ...props })));
};
