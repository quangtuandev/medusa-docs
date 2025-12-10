import React from "react";
const DATE_REGEX = /^[a-zA-Z]+ (?<month>[a-zA-Z]+)/;
export const EditDate = ({ date }) => {
    const today = new Date(date);
    const dateObj = new Date(date);
    const formattedDate = dateObj.toString();
    const dateMatch = DATE_REGEX.exec(formattedDate);
    if (!dateMatch?.groups?.month) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("span", { className: "text-compact-small-plus" },
            "Edited ",
            dateMatch.groups.month,
            " ",
            dateObj.getDate(),
            dateObj.getFullYear() !== today.getFullYear()
                ? `, ${dateObj.getFullYear()}`
                : ""),
        React.createElement("span", { className: "text-compact-small" }, "\u00B7")));
};
