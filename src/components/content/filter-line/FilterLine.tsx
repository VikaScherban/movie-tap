import "./FilterLine.css";
import GenreSelect from "./genre-select/GenreSelect";
import SortControl from "./sort-control/SortControl";
import {GenresList} from "../../../constants/genres-const";
import {FilterData} from "../../../models/filter";

function FilterLine({currentGenre, genreSelected, sortChanged, currentSorting}: FilterData) {
    return (
        <div data-testid="filter-line" className="filter-line">
            <GenreSelect
                genres={GenresList}
                currentGenre={currentGenre}
                genreSelected={genreSelected}
            ></GenreSelect>
            <SortControl currentSorting={currentSorting} sortChanged={sortChanged}></SortControl>
        </div>
    );
}

export default FilterLine;
