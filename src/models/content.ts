import { Movie } from './movies';

export interface ContentData {
    onMovieDelete: (id: number) => void;
    movieList: Movie[];
}
