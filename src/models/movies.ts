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
    onMovieSelected: (id: number) => void;
    onMovieEdit: (id: number) => void;
    onMovieDelete: (id: number) => void;
}

export interface MovieDialogData {
    onClose: () => void;
    onSubmitChanges: (data: Movie) => void;
    movie?: Movie | null
    title?: string;
}

export interface MovieFormData {
    onClose: () => void;
    onSubmitChanges: (data: Movie) => void;
    movie?: Movie | null;
}

export interface MovieDialogState {
    isOpen: boolean;
    title: string;
    movie: Movie | null;
}
