import React from 'react';
import {StoryFn, Meta} from '@storybook/react';
import Content from "../components/content/Content";

export default {
    title: 'Components/Content',
    component: Content,
} as Meta;

const Template: StoryFn<typeof Content> = (args) => <Content {...args} />;

export const Default = Template.bind({});
Default.args = {
    movieSelected: (id: number) => console.log("Movie selected:", id),
};
