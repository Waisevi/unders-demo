import type { Meta, StoryObj } from '@storybook/react';
import { Control } from './control';

const meta: Meta<typeof Control> = {
  title: 'ui/Control',
  component: Control,
  argTypes: {
    label: { control: 'text' },
    children: { control: 'text' },
    error: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Control>;

export const Default: Story = {
  args: {
    label: 'Control label',
    children: 'Control contents',
    error: '',
  },
};

export const WithError: Story = {
  args: {
    label: 'Control label',
    children: 'Control contents',
    error: 'This field is required',
  },
};
