import MiniSearch from "minisearch";
export const getLocalSearch = ({ docs, searchableFields, options, }) => {
    try {
        const miniSearch = new MiniSearch({
            fields: searchableFields,
            ...options,
        });
        miniSearch.addAll(docs);
        return miniSearch;
    }
    catch (e) {
        console.warn(e);
    }
};
