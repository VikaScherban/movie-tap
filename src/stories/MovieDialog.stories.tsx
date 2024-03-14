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
        name: "Movie Title",
        imgUrl: "https://example.com/movie-img.jpg",
        genres: [GenreTitle.Documentary],
        date: "2022-06-30",
        rating: 4.5,
        duration: 150,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
};
