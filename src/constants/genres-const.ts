import {Genre} from "../models/genres";

export enum GenreTitle {
    All = 'All',
    Documentary = 'Documentary',
    Comedy = 'Comedy',
    Horror = 'Horror',
    Crime = 'Crime'
}

export const GenresList: Genre[] = [
    { name: GenreTitle.All, id: 0 },
    { name: GenreTitle.Documentary, id: 1 },
    { name: GenreTitle.Comedy, id: 2 },
    { name: GenreTitle.Horror, id: 3 },
    { name: GenreTitle.Crime, id: 4 },
];
