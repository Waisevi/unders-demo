import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { createForm, Form } from './form';
import { TextInputField } from './text-input-field';
import { FormControl } from './form-control';
import { fn } from '@storybook/test';

const form = createForm({
  textFieldOptional: z.string().optional(),
  textFieldRequired: z.string().nonempty({ message: 'Required field' }),
});

const meta: Meta<typeof Form> = {
  title: 'form/Form',
  component: Form,
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    schema: form.schema,
    defaultValues: {
      textFieldOptional: 'Some default',
      textFieldRequired: '',
    },
    onSubmit: fn(),
    onSubmitError: fn(),
    children: (
      <div>
        <FormControl label="Optional field" name={form.fields.textFieldOptional}>
          <TextInputField name={form.fields.textFieldOptional} placeholder="Optional..." />
        </FormControl>

        <FormControl label="Required field" name={form.fields.textFieldRequired}>
          <TextInputField name={form.fields.textFieldRequired} placeholder="Required..." />
        </FormControl>

        <button type="submit">Submit</button>
      </div>
    ),
  },
};
