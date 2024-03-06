import "./Content.css";
import GenreSelect from "./genres/GenreSelect";
import {Genre} from "../../models/genres";
import {useState} from "react";
import {GenresList} from "../../constants/genres-const"

function Content() {
    const [currentGenre, updateGenre] = useState(GenresList[0]);

    const genreSelected = (newGenre: Genre) => {
        updateGenre(newGenre)

        console.log('Content, genreSelected', newGenre);
    }

    return (
        <div>
            <div className="wrap-content">
                <GenreSelect
                    genres={GenresList}
                    currentGenre={currentGenre}
                    genreSelected={genreSelected}
                ></GenreSelect>
            </div>
        </div>
    );
}

export default Content;
