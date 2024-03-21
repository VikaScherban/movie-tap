import {Movie} from "./movies";

export interface ContentData {
    onMovieSelected: (id: number) => void;
    onMovieEdit: (id: number) => void;
    onMovieDelete: (id: number) => void;
    onSortChanged: (sort: string) => void;
    onGenreSelected: (genre: string) => void;
    data: {
        movieList: Movie[],
        sortBy: string,
        activeGenre: string,
    }
}
