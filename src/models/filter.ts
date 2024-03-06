import {SortByOption} from "../constants/sort-control-const";
import {Genre} from "./genres";
export interface FilterData {
    currentGenre: Genre;
    genreSelected: (genre: Genre) => void;
    currentSorting: SortByOption;
    sortChanged: (value: SortByOption) => void;
}
