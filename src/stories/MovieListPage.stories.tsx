import React from 'react';

import { StoryFn, Meta } from '@storybook/react';
import { Router } from 'react-router-dom';
import MovieListPage from '../components/MovieListPage';

export default {
  title: 'Components/MovieListPage',
  component: MovieListPage,
  decorators: [
    // @ts-ignore
    (Story) => (<Router location="/"><Story /></Router>),
  ],
} as Meta;

const Template: StoryFn<typeof MovieListPage> = () => <MovieListPage />;

export const Default = Template.bind({});
Default.args = {};
