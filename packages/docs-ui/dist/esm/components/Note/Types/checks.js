import React from "react";
import { NoteLayout } from "../Layout";
export const CheckNote = ({ title = "Prerequisites", ...props }) => {
    return React.createElement(NoteLayout, { title: title, ...props });
};
