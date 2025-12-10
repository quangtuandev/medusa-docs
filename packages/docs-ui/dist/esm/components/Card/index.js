import React from "react";
import { CardDefaultLayout } from "./Layout/Default";
import { CardLargeLayout } from "./Layout/Large";
import { CardFillerLayout } from "./Layout/Filler";
import { CardLayoutMini } from "./Layout/Mini";
export const Card = ({ type = "default", ...props }) => {
    switch (type) {
        case "large":
            return React.createElement(CardLargeLayout, { ...props });
        case "filler":
            return React.createElement(CardFillerLayout, { ...props });
        case "mini":
            return React.createElement(CardLayoutMini, { ...props });
        default:
            return React.createElement(CardDefaultLayout, { ...props });
    }
};
