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

// @ts-ignore
export interface NewMovie extends Movie {
    id?: number;
}

export interface MovieTileData {
    movieInfo: Movie;
    onMovieDelete: (id: number) => void;
}

export interface MovieFormData {
    onClose: () => void;
    onSubmitChanges: (data: NewMovie) => void;
    movie?: Movie | null;
}

export interface SaveMovieData {
    createMovie: (movie: NewMovie)  => Promise<void>;
    updateMovie: (movie: Movie)  => Promise<void>;
}
