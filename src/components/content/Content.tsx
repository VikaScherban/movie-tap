import "./Content.css";
import {Genre} from "../../models/genres";
import {useState} from "react";
import {GenresList} from "../../constants/genres-const"
import FilterLine from "./filter-line/FilterLine";
import {SortByOption} from "../../constants/sort-control-const";
import MovieTile from "./movie-tile/MovieTile";
import {MoviesList} from "../../constants/movies-const";

function Content({movieSelected}: {movieSelected: (id: number) => void}) {
    const [currentGenre, updateGenre] = useState(GenresList[0]);
    const [currentSorting, updateSorting] = useState(SortByOption.ReleaseDate);

    const genreSelected = (newGenre: Genre) => {
        updateGenre(newGenre)

        console.log('Content, genreSelected', newGenre);
    }

    const sortChanged = (newValue: SortByOption) => {
        updateSorting(newValue);

        console.log('Content, sortChanged', newValue);
    }

    const onMovieSelected = (movieId: number) => {
        movieSelected(movieId);

        console.log('movieSelected', movieId);
    }

    return (
        <div className="wrap-content" data-testid="movie-list">
           <FilterLine currentGenre={currentGenre}
                       genreSelected={genreSelected}
                       currentSorting={currentSorting}
                       sortChanged={sortChanged} />
            <div className="count-result"><strong>39</strong> movies found</div>
            <div className="movie-list">
                {MoviesList.map((movieInfo) => (
                    <MovieTile key={movieInfo.id} movieInfo={movieInfo} movieSelected={onMovieSelected} />
                ))}
            </div>
        </div>
    );
}

export default Content;
