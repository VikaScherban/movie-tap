import React from 'react';

import {Meta, StoryFn} from '@storybook/react';
import MovieTile from "../components/content/movie-tile/MovieTile";
import {GenreTitle} from "../constants/genres-const";

export default {
    title: 'Components/MovieTile',
    component: MovieTile,
} as Meta;

const Template: StoryFn<typeof MovieTile> = (args) => <MovieTile {...args} />;

export const Default = Template.bind({});
Default.args = {
    movieInfo: {
        id: 1,
        title: "Movie Title",
        poster_path: "https://artofthemovies.co.uk/cdn/shop/products/IMG_2672-955819.jpg?v=1686847908",
        genres: [GenreTitle.Documentary, GenreTitle.Comedy],
        release_date: "2022-06-30",
        overview: 'Some text',
        runtime: 123,
        vote_average: 5.7
    },
    onMovieSelected: (id: number) => console.log("Movie selected:", id),
};
