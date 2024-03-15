import "./Content.css";
import {useState} from "react";
import {GenreTitle} from "../../constants/genres-const"
import FilterLine from "./filter-line/FilterLine";
import {SortByOption} from "../../constants/sort-control-const";
import MovieTile from "./movie-tile/MovieTile";
import {ContentData} from "../../models/content";

function Content({moviesList, onMovieSelected, onMovieEdit, onMovieDelete}: ContentData) {
    const [currentGenre, updateGenre] = useState(GenreTitle.All);
    const [currentSorting, updateSorting] = useState(SortByOption.ReleaseDate);

    const onGenreSelected = (newGenre: GenreTitle) => {
        updateGenre(newGenre)

        console.log('Content, genreSelected', newGenre);
    }

    const onSortChanged = (newValue: SortByOption) => {
        updateSorting(newValue);

        console.log('Content, sortChanged', newValue);
    }

    return (
        <div className="wrap-content" data-testid="movie-list">
           <FilterLine currentGenre={currentGenre}
                       onGenreSelected={onGenreSelected}
                       currentSorting={currentSorting}
                       onSortChanged={onSortChanged} />
            <div className="count-result"><strong>39</strong> movies found</div>
            <div className="movie-list">
                {moviesList.map((movieInfo) => (
                    <MovieTile key={movieInfo.id}
                               movieInfo={movieInfo}
                               onMovieSelected={onMovieSelected}
                               onMovieEdit={onMovieEdit}
                               onMovieDelete={onMovieDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default Content;
