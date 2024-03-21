import {GenreTitle} from "../constants/genres-const";

export interface GenreData {
    genres: string[];
    currentGenre: string;
    onGenreSelected: (genre: string) => void;
}
