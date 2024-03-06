import {Movie} from "./movies";

export interface ContentData {
    moviesList: Movie[];
    onMovieSelected: (id: number) => void;
}
