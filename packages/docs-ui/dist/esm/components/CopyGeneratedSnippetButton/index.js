"use client";
import React from "react";
import { CopyButton, useGenerateSnippet } from "../..";
import { SquareTwoStack, CheckCircle } from "@medusajs/icons";
export const CopyGeneratedSnippetButton = ({ tooltipText, ...props }) => {
    const { snippet } = useGenerateSnippet(props);
    return (React.createElement(CopyButton, { text: snippet, tooltipText: tooltipText, className: "inline-block w-fit" }, ({ isCopied }) => {
        if (isCopied) {
            return React.createElement(CheckCircle, null);
        }
        return React.createElement(SquareTwoStack, null);
    }));
};
