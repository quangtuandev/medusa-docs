import React from "react";
import { NoteLayout } from "../Layout";
export const WarningNote = ({ title = "Warning", ...props }) => {
    return React.createElement(NoteLayout, { title: title, ...props });
};
