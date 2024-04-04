import React from 'react';
import {Meta, StoryFn} from '@storybook/react';
import MovieDialog from "../components/dialogs/movie-dialog/MovieDialog";
import {GenreTitle} from "../constants/genres-const";

export default {
    title: 'Components/MovieDialog',
    component: MovieDialog,
} as Meta;

const Template: StoryFn<typeof MovieDialog> = (args) => <MovieDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
    onClose: () => console.log("Dialog closed"),
    onSubmitChanges: (data) => console.log("Changes submitted:", data),
    title: "Add movie",
    movie: null,
};

export const DialogWithMovie = Template.bind({});
Default.args = {
    onClose: () => console.log("Dialog closed"),
    onSubmitChanges: (data) => console.log("Changes submitted:", data),
    title: "Edit movie",
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
