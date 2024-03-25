export interface FilterData {
    currentGenre: string;
    onGenreSelected: (genre: string) => void;
    currentSorting: string;
    onSortChanged: (value: string) => void;
}
