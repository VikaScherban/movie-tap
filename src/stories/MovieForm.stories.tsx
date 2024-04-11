import React from 'react';
import {Meta, StoryFn} from '@storybook/react';
import MovieForm from "../components/dialogs/movie-dialog/movie-form/MovieForm";
import {GenreTitle} from "../constants/genres-const";

export default {
    title: 'Components/MovieForm',
    component: MovieForm,
} as Meta;

const Template: StoryFn<typeof MovieForm> = (args) => <MovieForm {...args} />;

export const Default = Template.bind({});
Default.args = {
    onSubmitChanges: (data) => console.log("Changes submitted:", data),
    movie: null,
};

export const FormWithMovie = Template.bind({});
FormWithMovie.args = {
    onSubmitChanges: (data) => console.log("Changes submitted:", data),
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
};
