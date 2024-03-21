import React from 'react';

import { StoryFn, Meta } from '@storybook/react';
import MovieListPage from "../components/MovieListPage";

export default {
    title: 'Components/MovieListPage',
    component: MovieListPage,
} as Meta;

const Template: StoryFn<typeof MovieListPage> = () => <MovieListPage />;

export const Default = Template.bind({});
Default.args = {};
