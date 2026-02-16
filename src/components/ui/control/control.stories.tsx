import { Control } from './control';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Control> = {
  argTypes: {
    children: { control: 'text' },
    error: { control: 'text' },
    label: { control: 'text' },
  },
  component: Control,
  title: 'ui/Control',
};

export default meta;

type Story = StoryObj<typeof Control>;

export const Default: Story = {
  args: {
    children: 'Control contents',
    error: '',
    label: 'Control label',
  },
};

export const WithError: Story = {
  args: {
    children: 'Control contents',
    error: 'This field is required',
    label: 'Control label',
  },
};
