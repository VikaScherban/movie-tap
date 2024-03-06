import React from 'react';
import Counter from '../components/Counter';
import {Meta, StoryFn} from '@storybook/react';

export default {
    title: 'Components/Counter',
    component: Counter,
} as Meta;

const Template: StoryFn<typeof Counter> = (args) => <Counter {...args} />;

export const Default = Template.bind({});
Default.args = {
    initialValue: 0,
};

export const InitialValue10 = Template.bind({});
InitialValue10.args = {
    initialValue: 10,
};

export const InitialValueNegative5 = Template.bind({});
InitialValueNegative5.args = {
    initialValue: -5,
};
