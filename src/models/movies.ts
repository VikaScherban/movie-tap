export interface Movie {
    genres: string[];
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    title: string;
    vote_average: number;
    vote_count?: number;
    tagline?: string;
    budget?: number;
    revenue?: number
}

export interface MovieTileData {
    movieInfo: Movie;
    onMovieEdit: (id: number) => void;
    onMovieDelete: (id: number) => void;
}

export interface MovieDialogData {
    isOpen: boolean;
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
