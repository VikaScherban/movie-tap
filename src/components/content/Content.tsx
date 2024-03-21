import "./Content.css";
import FilterLine from "./filter-line/FilterLine";
import MovieTile from "./movie-tile/MovieTile";
import {ContentData} from "../../models/content";
import React from "react";

function Content({data, onMovieSelected, onMovieEdit, onMovieDelete, onGenreSelected, onSortChanged}: ContentData): React.JSX.Element {
    return (
        <div className="wrap-content" data-testid="movie-list">
           <FilterLine currentGenre={data.activeGenre}
                       onGenreSelected={onGenreSelected}
                       currentSorting={data.sortBy}
                       onSortChanged={onSortChanged} />
            <div className="count-result"><strong>{data.movieList?.length}</strong> movies found</div>
            <div className="movie-list">
                {data.movieList?.map((movieInfo) => (
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
