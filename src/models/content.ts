import {Movie} from "./movies";

export interface ContentData {
    onMovieEdit: (id: number) => void;
    onMovieDelete: (id: number) => void;
    movieList: Movie[];
}
