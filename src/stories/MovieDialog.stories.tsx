import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Router } from 'react-router-dom';
import MovieDialog from '../components/dialogs/movie-dialog/MovieDialog';

export default {
  title: 'Components/MovieDialog',
  component: MovieDialog,
  decorators: [
    // @ts-ignore
    (Story) => (<Router location="/new"><Story /></Router>),
  ],
} as Meta;

const Template: StoryFn<typeof MovieDialog> = () => <MovieDialog />;

export const Default = Template.bind({});
Default.args = {};
