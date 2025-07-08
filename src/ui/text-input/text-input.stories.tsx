import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './text-input';

const meta: Meta<typeof TextInput> = {
  title: 'ui/TextInput',
  component: TextInput,
  argTypes: {
    startAdornment: {
      control: { type: 'text' },
    },
    endAdornment: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    disabled: false,
  },
};

export const WithAdornments: Story = {
  args: {
    placeholder: 'Search...',
    startAdornment: <span>🔍</span>,
    endAdornment: <span>⌨️</span>,
  },
};
