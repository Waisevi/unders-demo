import { ChangeEvent, ComponentPropsWithoutRef, FocusEvent, forwardRef } from 'react';
import mergeRefs from 'merge-refs';
import { TextInput } from '@/ui/text-input';
import { useController } from 'react-hook-form';
import type { FormFieldName } from './form';

type Props = Omit<ComponentPropsWithoutRef<typeof TextInput>, 'name' | 'value'> & {
  /**
   * Unique branded form input identifier
   */
  name: FormFieldName;
};

/**
 * Displays generic input for the text content, attaching it to the form
 * context
 */
export const TextInputField = forwardRef<HTMLInputElement, Props>(
  ({ name, onChange, onBlur, ...props }, ref) => {
    const { field } = useController({ name });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      field?.onChange(e);
      onChange?.(e);
    }

    function handleBlur(e: FocusEvent<HTMLInputElement>) {
      field?.onBlur();
      onBlur?.(e);
    }

    return (
      <TextInput
        {...props}
        {...field}
        ref={mergeRefs(field.ref, ref)}
        onChange={handleChange}
        onBlur={handleBlur}
        endAdornment={<>{props.endAdornment}</>}
      />
    );
  },
);

TextInputField.displayName = 'TextInputField';
