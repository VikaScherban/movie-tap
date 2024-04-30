import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { SortByOptions } from '../constants/sort-control-const';
import SortControl from '../components/content/filter-line/sort-control/SortControl';

export default {
  title: 'Components/SortControl',
  component: SortControl,
} as Meta;

const Template: StoryFn<typeof SortControl> = (args) => <SortControl {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentSorting: SortByOptions.releaseDate.value,
  onSortChanged: (value: string) => console.log('Sorting changed:', value),
};

export const CurrentSortingTitle = Template.bind({});
CurrentSortingTitle.args = {
  currentSorting: SortByOptions.title.value,
  onSortChanged: (value: string) => console.log('Sorting changed:', value),
};

export const CurrentSortingReleaseDate = Template.bind({});
CurrentSortingReleaseDate.args = {
  currentSorting: SortByOptions.releaseDate.value,
  onSortChanged: (value: string) => console.log('Sorting changed:', value),
};
