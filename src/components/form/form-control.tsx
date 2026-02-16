import { ComponentPropsWithoutRef, FC } from 'react';

import { Control } from '../ui/control';
import { FormFieldName } from './form';
import { useValidationMessage } from './use-validation-message';

type Props = {
  /**
   * Branded form field name
   */
  name: FormFieldName;
} & Omit<ComponentPropsWithoutRef<typeof Control>, 'name'>;

/**
 * Displays form control element, attached to the form context
 */
export const FormControl: FC<Props> = ({ children, error, name, ...props }) => {
  const validationMessage = useValidationMessage(name);

  return (
    <Control {...props} error={error === undefined ? validationMessage : error}>
      {children}
    </Control>
  );
};
