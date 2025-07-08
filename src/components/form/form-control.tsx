import { ComponentPropsWithoutRef, FC } from 'react';
import { Control } from '@/ui/control';
import { FormFieldName } from './form';
import { useValidationMessage } from './use-validation-message';

type Props = Omit<ComponentPropsWithoutRef<typeof Control>, 'name'> & {
  /**
   * Branded form field name
   */
  name: FormFieldName;
};

/**
 * Displays form control element, attached to the form context
 */
export const FormControl: FC<Props> = ({ children, name, error, ...props }) => {
  const validationMessage = useValidationMessage(name);

  return (
    <Control {...props} error={error === undefined ? validationMessage : error}>
      {children}
    </Control>
  );
};
