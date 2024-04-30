import React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { MemoryRouter } from 'react-router-dom';
import MovieDetails from '../components/header/movie-details/MovieDetails';

export default {
  title: 'Components/MovieDetails',
  component: MovieDetails,
  decorators: [
    (Story) => (<MemoryRouter initialEntries={['/74465']}><Story /></MemoryRouter>),
  ],
} as Meta;

const Template: StoryFn<typeof MovieDetails> = () => <MovieDetails />;

export const Default = Template.bind({});
Default.args = {
  movieId: 1,
};

export const NoMovieSelected = Template.bind({});
NoMovieSelected.args = {
  movieId: undefined,
};
