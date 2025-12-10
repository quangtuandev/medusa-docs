"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solutions = void 0;
const react_1 = __importStar(require("react"));
const components_1 = require("../../../components");
const Ul = components_1.MDXComponents["ul"];
const Li = components_1.MDXComponents["li"];
const Solutions = ({ feedback, message }) => {
    const [possibleSolutionsQuery, setPossibleSolutionsQuery] = (0, react_1.useState)("");
    const [possibleSolutions, setPossibleSolutions] = (0, react_1.useState)([]);
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
    (0, react_1.useEffect)(() => {
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
    return (react_1.default.createElement(react_1.default.Fragment, null, possibleSolutions.length > 0 && (react_1.default.createElement("div", { className: "txt-medium" },
        react_1.default.createElement("span", { className: "my-docs_1 mx-0 inline-block" }, "If you faced a problem, here are some possible solutions from GitHub:"),
        react_1.default.createElement(Ul, null, possibleSolutions.map((solution) => (react_1.default.createElement(Li, { key: solution.url },
            react_1.default.createElement(components_1.Link, { href: solution.html_url, target: "_blank", rel: "noreferrer", variant: "content" }, solution.title))))),
        react_1.default.createElement("span", null,
            "Explore more issues in",
            " ",
            react_1.default.createElement(components_1.Link, { href: `https://github.com/medusajs/medusa/issues?q=${possibleSolutionsQuery}`, target: "_blank", rel: "noreferrer", variant: "content" }, "the GitHub repository"))))));
};
exports.Solutions = Solutions;
