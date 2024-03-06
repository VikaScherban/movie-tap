import React from 'react';
import {Meta, StoryFn} from '@storybook/react';
import SearchForm from "../components/header/search-form/SearchForm";

export default {
    title: 'Components/SearchForm',
    component: SearchForm,
} as Meta;

const Template: StoryFn<typeof SearchForm> = (args) => <SearchForm {...args} />;

export const Default = Template.bind({});
Default.args = {
    searchChange: (query) => console.log("Search query changed:", query),
    initialQuery: "",
};

export const InitialQueryStarWars = Template.bind({});
InitialQueryStarWars.args = {
    searchChange: (query) => console.log("Search query changed:", query),
    initialQuery: "Star Wars",
};

export const InitialQueryDefaultAction = Template.bind({});
InitialQueryDefaultAction.args = {
    searchChange: (query) => console.log("Search query changed:", query),
    initialQuery: "Action",
};
