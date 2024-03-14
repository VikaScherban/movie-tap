import {Movie} from "./movies";

export interface ContentData {
    moviesList: Movie[];
    onMovieSelected: (id: number) => void;
    onMovieEdit: (id: number) => void;
    onMovieDelete: (id: number) => void;
}
