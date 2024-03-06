import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import {Genre} from "../models/genres";
import {GenresList} from "../constants/genres-const";
import GenreSelect from "../components/content/filter-line/genre-select/GenreSelect";

export default {
    title: 'Components/GenreSelect',
    component: GenreSelect,
} as Meta;

const Template: StoryFn<typeof GenreSelect> = (args) => <GenreSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
    genres: GenresList,
    currentGenre: GenresList[0],
    genreSelected: (selectedGenre: Genre) => console.log("Genre selected:", selectedGenre),
};

export const CurrentGenreComedy = Template.bind({});
CurrentGenreComedy.args = {
    genres: GenresList,
    currentGenre: GenresList[2],
    genreSelected: (selectedGenre: Genre) => console.log("Genre selected:", selectedGenre),
};

export const CurrentGenreCrime = Template.bind({});
CurrentGenreCrime.args = {
    genres: GenresList,
    currentGenre: GenresList[4],
    genreSelected: (selectedGenre: Genre) => console.log("Genre selected:", selectedGenre),
};
