import FilterLine from "./filter-line/FilterLine";
import MovieTile from "./movie-tile/MovieTile";
import {ContentData} from "../../models/content";
import React from "react";

function Content({onMovieDelete, movieList}: ContentData): React.JSX.Element {
    return (
        <div className="wrap-content">
            <FilterLine/>
            <div className="count-result"><strong>{movieList?.length}</strong> movies found</div>
            <div className="movie-list">
                {movieList?.map((movieInfo) => (
                    <MovieTile key={movieInfo.id}
                               movieInfo={movieInfo}
                               onMovieDelete={onMovieDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default Content;
