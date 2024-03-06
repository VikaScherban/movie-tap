export interface Genre {
    name: string;
    id: number;
}

export interface GenreData {
    genres: Genre[];
    currentGenre: Genre;
    genreSelected: (genre: Genre) => void;
}
