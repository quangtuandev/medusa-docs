import React from "react";
import { Pagination } from "../Pagination";
export const Footer = ({ editComponent, showPagination, feedbackComponent, }) => {
    return (React.createElement(React.Fragment, null,
        feedbackComponent,
        showPagination && React.createElement(Pagination, null),
        editComponent));
};
