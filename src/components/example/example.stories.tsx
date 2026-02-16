import { http, HttpResponse } from 'msw';

import { Example } from './example';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Example> = {
  component: Example,
  title: 'Components/Box',
};

export default meta;

type Story = StoryObj<typeof Example>;

export const Default: Story = {
  args: {
    children: 'Hello from styled Example!',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/api/todos', () => {
          return HttpResponse.json([
            { id: 1, title: 'Mocked task 1' },
            { id: 2, title: 'Mocked task 2' },
          ]);
        }),
      ],
    },
  },
};
