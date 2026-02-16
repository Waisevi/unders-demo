import { TextField } from '@mui/material';
import { ChangeEvent, ComponentPropsWithoutRef, FocusEvent, forwardRef } from 'react';
import { useController } from 'react-hook-form';

import { MaskedInput } from './masked-input';

import type { FormFieldName } from './form';

type Props = {
  hideError?: boolean;
  mask?: string;
  name: FormFieldName;
} & Omit<ComponentPropsWithoutRef<typeof TextField>, 'name' | 'value'>;

export const TextInputField = forwardRef<HTMLInputElement, Props>(
  ({ hideError = false, mask, name, onBlur, onChange, ...props }, ref) => {
    const { field, fieldState } = useController({ name });

    const error = !!fieldState.error && !hideError;

    const commonProps = {
      ...props,
      error,
      inputRef: ref,

      onBlur: (e: FocusEvent<HTMLInputElement>) => {
        field.onBlur();
        onBlur?.(e);
      },
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        field.onChange(e);
        onChange?.(e);
      },
      value: field.value ?? '',
    };

    if (mask) {
      return (
        <TextField
          {...commonProps}
          InputProps={{
            inputComponent: MaskedInput as any,
            inputProps: {
              mask,
              name,
            },
          }}
        />
      );
    }

    return <TextField {...field} {...commonProps} />;
  },
);

TextInputField.displayName = 'TextInputField';
