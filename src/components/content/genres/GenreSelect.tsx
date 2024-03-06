import "./GenreSelect.css";
import {GenreData} from "../../../models/genres";

function GenreSelect({genres, currentGenre, genreSelected}: GenreData) {
    return (
        <div className="genres-wrapper">
            <ul className="genres-list">
                {genres.map((genre) => (
                    <li
                        key={genre.id}
                        className={currentGenre.id === genre.id ? "genre-tab active" : "genre-tab"}
                        onClick={() => genreSelected(genre)}
                    >{genre.name}</li>
                ))}
            </ul>
            <div className="sort-by-block">
                <div>SORT BY</div>
            </div>
        </div>
    );
}

export default GenreSelect;
