import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Router } from 'react-router-dom';
import SearchForm from '../components/header/search-form/SearchForm';

export default {
  title: 'Components/SearchForm',
  component: SearchForm,
  decorators: [
    // @ts-ignore
    (Story) => (<Router location="/:1"><Story /></Router>),
  ],
} as Meta;

const Template: StoryFn<typeof SearchForm> = () => <SearchForm />;

export const Default = Template.bind({});
Default.args = {};
