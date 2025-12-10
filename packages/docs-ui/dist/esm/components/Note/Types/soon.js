import React from "react";
import { NoteLayout } from "../Layout";
export const SoonNote = ({ title = "Coming soon", ...props }) => {
    return React.createElement(NoteLayout, { title: title, ...props });
};
