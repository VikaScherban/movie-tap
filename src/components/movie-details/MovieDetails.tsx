import "./MovieDetails.css";
import {Movie} from "../../models/movies";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

function MovieDetails({movie, goBackClick} : {movie: Movie | null, goBackClick: () => void}) {
    const convertToHours = (totalMinutes: number) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return `${hours}h ${minutes}min`;
    }

    return (
        <div className="movie-details-wrapper">
            { !movie ?
                <div>No movie selected</div> :
                <div>
                    <div className="top-content">
                        <div className="logo-block"></div>
                        <button className="add-button" onClick={goBackClick} data-testid="search-icon">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    <div className="detail-content">
                        <div className="detail-poster">
                            <img src={movie.imgUrl} alt={movie.name} key={movie.imgUrl}/>
                        </div>
                        <div className="detail-text">
                            <div>
                                <div className="detail-text-name">{movie.name}</div>
                                <div className="detail-text-rating">{movie.rating}</div>
                                <div className="detail-text-genres">{movie.genres.join(', ')}</div>
                            </div>
                            <div className="detail-text-numbers">
                                <div className="detail-text-date">{movie.date}</div>
                                <div className="detail-text-duration">{convertToHours(movie.duration)}</div>
                            </div>
                            <div className="detail-text-description">{movie.description}</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default MovieDetails;
