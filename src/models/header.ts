export interface HeaderData {
    query: string;
    addMovie: () => void;
    onSearchChanged: (query: string) => void;
}
