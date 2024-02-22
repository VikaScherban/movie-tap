export type SearchFunction = (query: string) => void;

export interface SearchData {
    initialQuery: string;
    searchChange: SearchFunction;
}
