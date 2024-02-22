import "./Content.css";
import GenreSelect from "./genres/GenreSelect";
import {Genre} from "../../models/genres";
import {useState} from "react";

function Content() {
    const genres: Genre[] = [
        { name: 'ALL', id: 0 },
        { name: 'DOCUMENTARY', id: 1 },
        { name: 'COMEDY', id: 2 },
        { name: 'HORROR', id: 3 },
        { name: 'CRIME', id: 4 },
    ];
    const [currentGenre, updateGenre] = useState(genres[0]);

    const genreSelected = (newGenre: Genre) => {
        updateGenre(newGenre)

        console.log('Content, genreSelected', newGenre);
    }

    return (
        <div>
            <div className="wrap-content">
                <GenreSelect
                    genres={genres}
                    currentGenre={currentGenre}
                    genreSelected={genreSelected}
                ></GenreSelect>
            </div>
        </div>
    );
}

export default Content;
