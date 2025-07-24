/* eslint-disable */
import {
  BaseSyntheticEvent,
  ChangeEvent,
  ComponentPropsWithoutRef,
  FC,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  ValidationMode,
  FieldErrors,
  FormProvider,
  useForm,
  FieldValues,
  FormState,
  UseFormReturn,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnyZodObject, z, ZodObject } from 'zod';

/**
 * Successful form submit data
 */
export type FormSubmit<TSchema extends AnyZodObject> = z.output<TSchema>;

/**
 * Erroneous form submit data
 */
export type FormSubmitError<TSchema extends AnyZodObject> = FieldErrors<z.output<TSchema>>;

/**
 * Branded form field name
 */
export type FormFieldName = string & {
  __type: 'formField';
};

/**
 * Imperative form handle
 */
export type FormRef = {
  /**
   * Programmatically trigger form submit
   */
  submit: () => void;

  /**
   * Programmatically trigger form submit, receiving results in a promise
   */
  handleSubmit: <TFieldValues extends FieldValues>() => Promise<
    [FieldErrors, null] | [null, TFieldValues]
  >;

  /**
   * Returns current form values
   */
  getValues: <TFieldValues>() => TFieldValues;

  /**
   * Sets value of the form field
   * @param name Field name to update
   * @param value New field value
   */
  setValue: (name: FormFieldName, value: any) => void;

  /**
   * Clear errors of the form field
   * @param name Field name to update
   */
  clearErrors: (...fieldNames: FormFieldName[]) => void;

  /**
   * Current form state
   */
  formState: FormState<any>;

  /**
   * Programmatically trigger form reset
   */
  reset: () => void;
};

/**
 * Returns form data based on provided shape
 * @param shape Form shape to be created
 */
export const createForm = <TSchema extends Record<string, any>>(shape: TSchema) => {
  return {
    /**
     * Form schema constraints
     */
    schema: z.object(shape),

    /**
     * Form fields descriptors
     */
    fields: Object.keys(shape).reduce(
      (acc, key) => {
        acc[key] = key;

        return acc;
      },
      {} as Record<string, string>,
    ) as Record<keyof TSchema, FormFieldName>,
  };
};

type Props<TSchema extends ZodObject<any>> = Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> & {
  /**
   * Form validation mode
   * @default {'onBlur'}
   */
  validationMode?: keyof ValidationMode;

  /**
   * Revalidation mode (e.g. after first submit event)
   * @default {'onChange'}
   */
  revalidationMode?: Exclude<keyof ValidationMode, 'onTouched' | 'all'>;

  /**
   * Form schema constraint
   */
  schema: TSchema;

  /**
   * Form children elements
   */
  children?: ReactNode;

  /**
   * Default form values
   */
  defaultValues?: z.input<TSchema>;

  /**
   * Unique test identifier
   */
  testID: string;

  /**
   * Metric goal type to emit based on user action
   * If omitted, reach goal metric will not be sent
   */
  metricGoal?: string;

  /**
   * Successful form submit event callback
   */
  onSubmit: (
    values: FormSubmit<TSchema>,
    event?: BaseSyntheticEvent,
    form?: UseFormReturn<any>,
  ) => void;

  /**
   * Unsuccessful form submit event callback(e.g. when validation failed)
   */
  onSubmitError?: (errors: FormSubmitError<TSchema>, event?: BaseSyntheticEvent) => void;

  /**
   * Form state change event callback
   * @param values Form values currently filled in
   * @param event Base form change event
   */
  onChange?: (values: Partial<FormSubmit<TSchema>>, event?: BaseSyntheticEvent) => void;

  /**
   * Form valid state change event handler
   * @param valid Current valid state
   */
  onChangeValidState?: (valid: boolean) => void;
};

/**
 * Displays generic form, emitting form context with provided constraints
 */
export const Form = forwardRef<FormRef, Props<any>>(
  (
    {
      children,
      schema,
      validationMode = 'onBlur',
      revalidationMode = 'onChange',
      defaultValues,
      testID,
      metricGoal,
      onSubmit,
      onSubmitError,
      onChange,
      onChangeValidState,
      ...props
    },
    ref,
  ) => {
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm({
      resolver: zodResolver(schema),
      defaultValues,
      mode: validationMode,
      reValidateMode: revalidationMode,
    });

    const validRef = useRef(form.formState.isValid);

    useImperativeHandle(
      ref,
      () =>
        ({
          submit: () => {
            formRef.current?.dispatchEvent(
              new Event('submit', { cancelable: true, bubbles: true }),
            );
          },
          getValues: () => form.getValues(),
          setValue: (name: FormFieldName, value: any) => form.setValue(name, value),
          clearErrors: (...fieldNames: FormFieldName[]) => form.clearErrors(fieldNames),
          handleSubmit: () =>
            new Promise((resolve) =>
              form.handleSubmit(
                (values) => resolve([null, values as any]),
                (errors) => resolve([errors, null]),
              )(),
            ),
          formState: form.formState,
          reset: form.reset,
        }) as FormRef,
    );

    useEffect(() => {
      if (validRef.current === form.formState.isValid) {
        return;
      }

      validRef.current = form.formState.isValid;

      onChangeValidState?.(form.formState.isValid);
    }, [form.formState.isValid, onChangeValidState]);

    function handleFormChange(e: ChangeEvent<HTMLFormElement>) {
      // Wait single tick to catch with updated form data
      setTimeout(() => {
        onChange?.(form.getValues(), e);
      });
    }

    return (
      <FormProvider {...form}>
        <form
          {...props}
          onChange={handleFormChange}
          ref={formRef}
          data-qa={testID}
          onSubmit={form.handleSubmit(
            (values, event) => onSubmit(values, event, form),
            onSubmitError,
          )}
          noValidate
        >
          {children}
        </form>
      </FormProvider>
    );
  },
) as <TSchema extends AnyZodObject>(p: Props<TSchema> & { ref?: Ref<FormRef> }) => ReactElement;

(Form as FC).displayName = 'Form';
