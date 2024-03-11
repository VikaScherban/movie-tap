import "./MovieTile.css";
import {MovieTileData} from "../../../models/movies";

function MovieTile({movieInfo, onMovieSelected}: MovieTileData) {
    return (
        <div className="movie-card" data-testid="movie-tile">
            <div className="movie-poster" onClick={() => onMovieSelected(movieInfo.id)}>
                <img src={movieInfo.imgUrl} alt={movieInfo.name} key={movieInfo.imgUrl} />
            </div>
            <div className="movie-info">
                <div>
                    <div className="movie-name" onClick={() => onMovieSelected(movieInfo.id)}>{movieInfo.name}</div>
                    <div className="movie-genres">{movieInfo.genres.join(', ')}</div>
                </div>
                <div className="movie-date">{movieInfo.date}</div>
            </div>
        </div>
    );
}

export default MovieTile;
