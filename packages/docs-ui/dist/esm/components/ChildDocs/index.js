"use client";
import React from "react";
import { useChildDocs } from "../..";
export const ChildDocs = (props) => {
    const { component } = useChildDocs(props);
    return React.createElement(React.Fragment, null, component);
};
