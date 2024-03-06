import {SortByOption} from "../constants/sort-control-const";
import {Genre} from "./genres";
export interface FilterData {
    currentGenre: Genre;
    onGenreSelected: (genre: Genre) => void;
    currentSorting: SortByOption;
    onSortChanged: (value: SortByOption) => void;
}
