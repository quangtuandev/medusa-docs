"use client";
import React from "react";
import { useColorMode } from "../../providers";
export const ThemeImage = ({ light, dark, alt = "", ...props }) => {
    const { colorMode } = useColorMode();
    return (React.createElement("img", { alt: alt, src: colorMode === "light" ? light : dark || light, ...props }));
};
