import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import React from "react";
import {Movie} from "~/models/movies";
import useMultipleSearchParams from "~/hooks/UseMultipleSearchParams";

function MovieDetails({movie}: {movie: Movie}): React.JSX.Element {
    const {navigateTo} = useMultipleSearchParams();
    const convertToHours = (totalMinutes: number) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return `${hours}h ${minutes}min`;
    }
    const goBack = () => {
        navigateTo('/');
    }

    if (!movie) {
        return <div>Movie is not found</div>;
    }

    return (
        <div className="movie-details-wrapper">
            <div className="top-content">
                <div className="logo-block"></div>
                <button className="add-button" onClick={goBack} data-testid="search-button">
                    <FontAwesomeIcon icon={faSearch}/>
                </button>
            </div>
            <div className="detail-content">
                <div className="detail-poster">
                    <img src={movie.poster_path} alt={movie.title} key={movie.poster_path}/>
                </div>
                <div className="detail-text">
                    <div>
                        <div className="detail-text-name">{movie.title}</div>
                        <div className="detail-text-rating">{movie.vote_average}</div>
                        <div className="detail-text-genres">{movie.genres.join(', ')}</div>
                    </div>
                    <div className="detail-text-numbers">
                        <div className="detail-text-date">{movie.release_date}</div>
                        <div className="detail-text-duration">{convertToHours(movie.runtime)}</div>
                    </div>
                    <div className="detail-text-description">{movie.overview}</div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
