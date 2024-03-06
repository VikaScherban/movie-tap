import "./FilterLine.css";
import GenreSelect from "./genre-select/GenreSelect";
import SortControl from "./sort-control/SortControl";
import {GenresList} from "../../../constants/genres-const";
import {FilterData} from "../../../models/filter";

function FilterLine({currentGenre, onGenreSelected, onSortChanged, currentSorting}: FilterData) {
    return (
        <div data-testid="filter-line" className="filter-line">
            <GenreSelect
                genres={GenresList}
                currentGenre={currentGenre}
                onGenreSelected={onGenreSelected}
            ></GenreSelect>
            <SortControl currentSorting={currentSorting} onSortChanged={onSortChanged}></SortControl>
        </div>
    );
}

export default FilterLine;
