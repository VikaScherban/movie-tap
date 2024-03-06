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
        imgUrl: "https://example.com/movie-img.jpg",
        genres: [GenreTitle.Documentary, GenreTitle.Comedy],
        date: "2022-06-30",
        description: 'Some text',
        duration: 123,
        rating: 5.7
    },
    movieSelected: (id: number) => console.log("Movie selected:", id),
};
