import "./FilterLine.css";
import GenreSelect from "./genre-select/GenreSelect";
import SortControl from "./sort-control/SortControl";
import {FilterData} from "../../../models/filter";
import {GenreTitle} from "../../../constants/genres-const";
import React from "react";

function FilterLine({currentGenre, onGenreSelected, onSortChanged, currentSorting}: FilterData): React.JSX.Element {
    return (
        <div data-testid="filter-line" className="filter-line">
            <GenreSelect
                genres={Object.values(GenreTitle)}
                currentGenre={currentGenre}
                onGenreSelected={onGenreSelected}
            ></GenreSelect>
            <SortControl currentSorting={currentSorting} onSortChanged={onSortChanged}></SortControl>
        </div>
    );
}

export default FilterLine;
