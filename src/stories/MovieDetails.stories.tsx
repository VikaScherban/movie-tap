import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {GenreTitle} from "../constants/genres-const";
import MovieDetails from "../components/movie-details/MovieDetails";

export default {
    title: 'Components/MovieDetails',
    component: MovieDetails,
} as Meta;

const Template: StoryFn<typeof MovieDetails> = (args) => <MovieDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
    movie: {
        id: 1,
        title: "Movie Title",
        poster_path: "https://example.com/movie-img.jpg",
        genres: [GenreTitle.Crime],
        release_date: "2022-06-30",
        vote_average: 4.5,
        runtime: 150,
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    goBackClick: () => console.log("Go back clicked"),
};

export const NoMovieSelected = Template.bind({});
NoMovieSelected.args = {
    movie: null,
    goBackClick: () => console.log("Go back clicked"),
};
