import type { Meta, StoryObj } from '@storybook/react';
import { Example } from './example';
import { http, HttpResponse } from 'msw';

const meta: Meta<typeof Example> = {
  title: 'Components/Box',
  component: Example,
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
