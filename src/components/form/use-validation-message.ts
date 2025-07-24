import { useFormContext } from 'react-hook-form';
import { FormFieldName } from './form';

/**
 * Returns validation message given the provided form input name
 * @param name Form field name to check
 */
export function useValidationMessage(name: FormFieldName) {
  const { formState } = useFormContext();

  const err = formState.errors[name];

  if (!err) {
    return null;
  }

  if (Array.isArray(err)) {
    return err.find((e) => e?.message)?.message;
  }

  return String(err.message);
}
