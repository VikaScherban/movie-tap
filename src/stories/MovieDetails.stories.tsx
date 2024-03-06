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
        name: "Movie Title",
        imgUrl: "https://example.com/movie-img.jpg",
        genres: [GenreTitle.Horror],
        rating: 4.5,
        date: "2022-06-30",
        duration: 150,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    goBackClick: () => console.log("Go back clicked"),
};

export const NoMovieSelected = Template.bind({});
NoMovieSelected.args = {
    movie: null,
    goBackClick: () => console.log("Go back clicked"),
};
