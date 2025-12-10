import React from "react";
import { NoteLayout } from "../Layout";
export const ErrorNote = ({ title = "Error", ...props }) => {
    return React.createElement(NoteLayout, { title: title, ...props });
};
