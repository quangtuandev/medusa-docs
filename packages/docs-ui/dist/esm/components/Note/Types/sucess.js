import React from "react";
import { NoteLayout } from "../Layout";
export const SuccessNote = ({ title = "Sucess", ...props }) => {
    return React.createElement(NoteLayout, { title: title, ...props });
};
