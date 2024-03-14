import {SortByOption} from "../constants/sort-control-const";
import {GenreTitle} from "../constants/genres-const";
export interface FilterData {
    currentGenre: GenreTitle;
    onGenreSelected: (genre: GenreTitle) => void;
    currentSorting: SortByOption;
    onSortChanged: (value: SortByOption) => void;
}
