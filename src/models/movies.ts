import {GenreTitle} from "../constants/genres-const";

export interface Movie {
    name: string;
    id: number;
    imgUrl: string;
    date: string;
    genres: GenreTitle[];
    rating: number;
    description: string;
    duration: number;
}

export interface MovieTileData {
    movieInfo: Movie;
    movieSelected: (id: number) => void;
}
