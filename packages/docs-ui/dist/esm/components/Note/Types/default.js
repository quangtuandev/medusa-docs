import React from "react";
import { NoteLayout } from "../Layout";
export const DefaultNote = ({ title = "Note", ...props }) => {
    return React.createElement(NoteLayout, { title: title, ...props });
};
