import "./GenreSelect.css";
import {GenreData} from "../../../../models/genres";

function GenreSelect({genres, currentGenre, onGenreSelected}: GenreData) {
    return (
        <div>
            <ul className="genres-list">
                {genres.map((genre) => (
                    <li
                        key={genre.id}
                        className={currentGenre.id === genre.id ? "genre-tab active" : "genre-tab"}
                        onClick={() => onGenreSelected(genre)}
                    >{genre.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default GenreSelect;
