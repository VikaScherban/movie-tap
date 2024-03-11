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
        name: "Movie Title",
        imgUrl: "https://artofthemovies.co.uk/cdn/shop/products/IMG_2672-955819.jpg?v=1686847908",
        genres: [GenreTitle.Documentary, GenreTitle.Comedy],
        date: "2022-06-30",
        description: 'Some text',
        duration: 123,
        rating: 5.7
    },
    onMovieSelected: (id: number) => console.log("Movie selected:", id),
};
