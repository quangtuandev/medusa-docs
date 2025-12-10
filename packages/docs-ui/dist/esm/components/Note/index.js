import React from "react";
import { WarningNote } from "./Types/warning";
import { DefaultNote } from "./Types/default";
import { SuccessNote } from "./Types/sucess";
import { ErrorNote } from "./Types/error";
import { CheckNote } from "./Types/checks";
import { SoonNote } from "./Types/soon";
export const Note = ({ type = "default", ...props }) => {
    switch (type) {
        case "warning":
            return React.createElement(WarningNote, { type: type, ...props });
        case "success":
            return React.createElement(SuccessNote, { type: type, ...props });
        case "error":
            return React.createElement(ErrorNote, { type: type, ...props });
        // TODO remove both once we've removed all notes using them
        case "check":
            return React.createElement(CheckNote, { type: type, ...props });
        case "soon":
            return React.createElement(SoonNote, { type: type, ...props });
        default:
            return React.createElement(DefaultNote, { type: type, ...props });
    }
};
