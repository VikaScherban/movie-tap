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
    onClose: () => console.log("Dialog closed"),
    onSubmitChanges: (data) => console.log("Changes submitted:", data),
    movie: null,
};

export const FormWithMovie = Template.bind({});
FormWithMovie.args = {
    onClose: () => console.log("Dialog closed"),
    onSubmitChanges: (data) => console.log("Changes submitted:", data),
    movie: {
        id: 1,
        name: "Movie Title",
        imgUrl: "https://example.com/movie-img.jpg",
        genres: [GenreTitle.Crime],
        date: "2022-06-30",
        rating: 4.5,
        duration: 150,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
};
