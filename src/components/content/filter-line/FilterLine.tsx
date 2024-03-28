import "./FilterLine.css";
import GenreSelect from "./genre-select/GenreSelect";
import SortControl from "./sort-control/SortControl";
import {GenreTitle} from "../../../constants/genres-const";
import React from "react";
import useMultipleSearchParams from "../../../hooks/UseMultipleSearchParams";

function FilterLine(): React.JSX.Element {
    const { updateQueryParams } = useMultipleSearchParams();
    const urlSearchParams = new URLSearchParams(location.search);
    const {genre, sort} = Object.fromEntries(urlSearchParams.entries());

    const onGenreSelected = (newGenre: string): void  => {
        const genre = newGenre === GenreTitle.All ? '' : newGenre;

        updateQueryParams({genre});
    }

    const onSortChanged = (newSort: string): void => {
        updateQueryParams({sort: newSort});
    }

    return (
        <div data-testid="filter-line" className="filter-line">
            <GenreSelect
                genres={Object.values(GenreTitle)}
                currentGenre={genre || GenreTitle.All}
                onGenreSelected={onGenreSelected}
            ></GenreSelect>
            <SortControl currentSorting={sort} onSortChanged={onSortChanged}></SortControl>
        </div>
    );
}

export default FilterLine;
