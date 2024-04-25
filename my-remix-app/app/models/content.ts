import {Movie} from "~/models/movies";

export interface ContentData {
    onMovieDelete: (id: number) => void;
    movieList: Movie[]
}
