import { fn } from 'storybook/test';
import { z } from 'zod';

import { createForm, Form } from './form';
import { FormControl } from './form-control';
import { TextInputField } from './text-input-field';

import type { Meta, StoryObj } from '@storybook/react';

const form = createForm({
  textFieldOptional: z.string().optional(),
  textFieldRequired: z.string().min(1, { error: 'Required field' }),
});

const meta: Meta<typeof Form> = {
  component: Form,
  title: 'form/Form',
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <FormControl label='Optional field' name={form.fields.textFieldOptional}>
          <TextInputField name={form.fields.textFieldOptional} placeholder='Optional...' />
        </FormControl>

        <FormControl label='Required field' name={form.fields.textFieldRequired}>
          <TextInputField name={form.fields.textFieldRequired} placeholder='Required...' />
        </FormControl>

        <button type='submit'>Submit</button>
      </div>
    ),
    defaultValues: {
      textFieldOptional: 'Some default',
      textFieldRequired: '',
    },
    onSubmit: fn(),
    onSubmitError: fn(),
    schema: form.schema,
  },
};
