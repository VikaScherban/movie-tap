import React from 'react';
import {Meta, StoryFn} from '@storybook/react';
import MovieDialog from "../components/dialogs/movie-dialog/MovieDialog";
import {Router} from "react-router-dom";

export default {
    title: 'Components/MovieDialog',
    component: MovieDialog,
    decorators: [
        // @ts-ignore
        (Story) => (<Router location={'/new'}><Story /></Router>),
    ],
} as Meta;

const Template: StoryFn<typeof MovieDialog> = (args) => <MovieDialog {...args} />;

export const Default = Template.bind({});
Default.args = {};
