"use client";
import React, { useEffect, useState } from "react";
import { Link, MDXComponents } from "../../../components";
const Ul = MDXComponents["ul"];
const Li = MDXComponents["li"];
export const Solutions = ({ feedback, message }) => {
    const [possibleSolutionsQuery, setPossibleSolutionsQuery] = useState("");
    const [possibleSolutions, setPossibleSolutions] = useState([]);
    function constructQuery(searchQuery) {
        return `${searchQuery} repo:medusajs/medusa is:closed is:issue`;
    }
    async function searchGitHub(query) {
        return fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(query)}&sort=updated&per_page=3&advanced_search=true`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
            },
        }).then(async (res) => res.json());
    }
    useEffect(() => {
        if (!feedback) {
            let query = constructQuery(
            // Github does not allow queries longer than 256 characters
            message ? message.substring(0, 256) : document.title);
            searchGitHub(query)
                .then(async (result) => {
                if (!result.items.length && message) {
                    query = constructQuery(document.title);
                    result = await searchGitHub(query);
                }
                setPossibleSolutionsQuery(query);
                setPossibleSolutions(result.items);
            })
                .catch((err) => console.error(err));
        }
        else {
            setPossibleSolutionsQuery("");
            setPossibleSolutions([]);
        }
    }, [feedback, message]);
    return (React.createElement(React.Fragment, null, possibleSolutions.length > 0 && (React.createElement("div", { className: "txt-medium" },
        React.createElement("span", { className: "my-docs_1 mx-0 inline-block" }, "If you faced a problem, here are some possible solutions from GitHub:"),
        React.createElement(Ul, null, possibleSolutions.map((solution) => (React.createElement(Li, { key: solution.url },
            React.createElement(Link, { href: solution.html_url, target: "_blank", rel: "noreferrer", variant: "content" }, solution.title))))),
        React.createElement("span", null,
            "Explore more issues in",
            " ",
            React.createElement(Link, { href: `https://github.com/medusajs/medusa/issues?q=${possibleSolutionsQuery}`, target: "_blank", rel: "noreferrer", variant: "content" }, "the GitHub repository"))))));
};
