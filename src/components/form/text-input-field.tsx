/* eslint-disable  */
import { forwardRef, ChangeEvent, FocusEvent, ComponentPropsWithoutRef } from 'react';
import { TextField } from '@mui/material';
import { useController } from 'react-hook-form';
import { MaskedInput } from './masked-input';
import type { FormFieldName } from './form';

type Props = Omit<ComponentPropsWithoutRef<typeof TextField>, 'name' | 'value'> & {
  name: FormFieldName;
  mask?: string;
  hideError?: boolean;
};

export const TextInputField = forwardRef<HTMLInputElement, Props>(
  ({ name, mask, hideError = false, onChange, onBlur, ...props }, ref) => {
    const { field, fieldState } = useController({ name });

    const error = !!fieldState.error && !hideError;

    const commonProps = {
      ...props,
      inputRef: ref,
      error,

      value: field.value ?? '',
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        field.onChange(e);
        onChange?.(e);
      },
      onBlur: (e: FocusEvent<HTMLInputElement>) => {
        field.onBlur();
        onBlur?.(e);
      },
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
