import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import BaseDialog from '../components/dialogs/base-dialog/BaseDialog';

export default {
  title: 'Components/BaseDialog',
  component: BaseDialog,
} as Meta;

const Template: StoryFn<typeof BaseDialog> = (args) => (
  <BaseDialog {...args}>
    <div>
      <p>This is the dialog content.</p>
      <p>It can contain any JSX content.</p>
    </div>
  </BaseDialog>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Dialog Title',
};
