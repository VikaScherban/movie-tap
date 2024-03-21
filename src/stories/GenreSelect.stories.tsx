import React from 'react';
import {Meta, StoryFn} from '@storybook/react';
import GenreSelect from "../components/content/filter-line/genre-select/GenreSelect";
import {GenreTitle} from "../constants/genres-const";

export default {
    title: 'Components/GenreSelect',
    component: GenreSelect,
} as Meta;

const Template: StoryFn<typeof GenreSelect> = (args) => <GenreSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
    genres: Object.values(GenreTitle),
    currentGenre: GenreTitle.All,
    onGenreSelected: (selectedGenre: string) => console.log("Genre selected:", selectedGenre),
};

export const CurrentGenreComedy = Template.bind({});
CurrentGenreComedy.args = {
    genres: Object.values(GenreTitle),
    currentGenre: GenreTitle.Comedy,
    onGenreSelected: (selectedGenre: string) => console.log("Genre selected:", selectedGenre),
};

export const CurrentGenreCrime = Template.bind({});
CurrentGenreCrime.args = {
    genres: Object.values(GenreTitle),
    currentGenre: GenreTitle.Crime,
    onGenreSelected: (selectedGenre: string) => console.log("Genre selected:", selectedGenre),
};
