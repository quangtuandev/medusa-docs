"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSimilarPages = void 0;
const navigation_1 = require("next/navigation");
const providers_1 = require("../../providers");
const react_1 = require("react");
const useSimilarPages = () => {
    const pathname = (0, navigation_1.usePathname)();
    const { searchClient, selectedIndex } = (0, providers_1.useSearch)();
    const [similarPages, setSimilarPages] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        void searchClient
            .search({
            requests: [
                {
                    query: pathname.split("/").join(" ").trim(),
                    indexName: selectedIndex,
                    hitsPerPage: 3,
                    distinct: true,
                },
            ],
        })
            .then(({ results }) => {
            const hits = "hits" in results[0] ? results[0].hits : [];
            const pages = hits.map((hit) => ({
                id: hit.objectID,
                title: hit.hierarchy.lvl1 || hit.hierarchy.lvl0 || "Untitled",
                url: hit.url,
            }));
            setSimilarPages(pages);
        })
            .catch(() => {
            setSimilarPages([]);
        });
    }, [pathname, searchClient]);
    return similarPages;
};
exports.useSimilarPages = useSimilarPages;
