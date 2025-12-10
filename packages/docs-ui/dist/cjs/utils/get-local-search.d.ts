import MiniSearch, { Options as MiniSearchOptions } from "minisearch";
type BaseSearchRecord = Record<string, unknown>;
type GetLocalSearchInput<T extends BaseSearchRecord = BaseSearchRecord> = {
    docs: T[];
    searchableFields: string[];
    options?: Omit<MiniSearchOptions, "fields">;
};
type SearchResult<T> = (T & {
    terms?: string[];
})[];
export type LocalSearch<T extends BaseSearchRecord = BaseSearchRecord> = MiniSearch & {
    search: (query: string) => SearchResult<T>;
};
export declare const getLocalSearch: <T extends BaseSearchRecord = BaseSearchRecord>({ docs, searchableFields, options, }: GetLocalSearchInput<T>) => LocalSearch<T> | undefined;
export {};
//# sourceMappingURL=get-local-search.d.ts.map