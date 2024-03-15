import {GenreTitle} from "../constants/genres-const";

export interface GenreData {
    genres: GenreTitle[];
    currentGenre: GenreTitle;
    onGenreSelected: (genre: GenreTitle) => void;
}
