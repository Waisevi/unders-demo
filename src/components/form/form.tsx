/* eslint-disable react/display-name */
import { zodResolver } from '@hookform/resolvers/zod';
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
  FieldErrors,
  FieldValues,
  FormProvider,
  FormState,
  useForm,
  UseFormReturn,
  ValidationMode,
} from 'react-hook-form';
import { z, ZodObject } from 'zod';

/**
 * Branded form field name
 */
export type FormFieldName = {
  __type: 'formField';
} & string;

/**
 * Imperative form handle
 */
export type FormRef = {
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
   * Returns current form values
   */
  getValues: <TFieldValues>() => TFieldValues;

  /**
   * Programmatically trigger form submit, receiving results in a promise
   */
  handleSubmit: <TFieldValues extends FieldValues>() => Promise<
    [FieldErrors, null] | [null, TFieldValues]
  >;

  /**
   * Programmatically trigger form reset
   */
  reset: () => void;

  /**
   * Sets value of the form field
   * @param name Field name to update
   * @param value New field value
   */
  setValue: (name: FormFieldName, value: any) => void;

  /**
   * Programmatically trigger form submit
   */
  submit: () => void;
};

/**
 * Successful form submit data
 */
export type FormSubmit<TSchema extends AnyZodObject> = z.output<TSchema>;

/**
 * Erroneous form submit data
 */
export type FormSubmitError<TSchema extends AnyZodObject> = FieldErrors<z.output<TSchema>>;

/**
 * Type alias for any Zod object schema (replaces removed AnyZodObject in Zod 4)
 */
type AnyZodObject = ZodObject<any>;

/**
 * Returns form data based on provided shape
 * @param shape Form shape to be created
 */
export const createForm = <TSchema extends Record<string, any>>(shape: TSchema) => {
  return {
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

    /**
     * Form schema constraints
     */
    schema: z.object(shape),
  };
};

type Props<TSchema extends AnyZodObject> = {
  /**
   * Form children elements
   */
  children?: ReactNode;

  /**
   * Default form values
   */
  defaultValues?: z.input<TSchema>;

  /**
   * Metric goal type to emit based on user action
   * If omitted, reach goal metric will not be sent
   */
  metricGoal?: string;

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
   * Revalidation mode (e.g. after first submit event)
   * @default {'onChange'}
   */
  revalidationMode?: Exclude<keyof ValidationMode, 'all' | 'onTouched'>;

  /**
   * Form schema constraint
   */
  schema: TSchema;

  /**
   * Unique test identifier
   */
  testID: string;

  /**
   * Form validation mode
   * @default {'onBlur'}
   */
  validationMode?: keyof ValidationMode;
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>;

/**
 * Displays generic form, emitting form context with provided constraints
 */
export const Form = forwardRef<FormRef, Props<any>>(
  (
    {
      children,
      defaultValues,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      metricGoal,
      onChange,
      onChangeValidState,
      onSubmit,
      onSubmitError,
      revalidationMode = 'onChange',
      schema,
      testID,
      validationMode = 'onBlur',
      ...props
    },
    ref,
  ) => {
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm({
      defaultValues,
      mode: validationMode,
      resolver: zodResolver(schema),
      reValidateMode: revalidationMode,
    });

    const validRef = useRef(form.formState.isValid);

    const handleSubmit = () =>
      new Promise((resolve) =>
        form.handleSubmit(
          (values) => resolve([null, values as any]),
          (errors) => resolve([errors, null]),
        )(),
      );

    useImperativeHandle(
      ref,
      () =>
        ({
          clearErrors: (...fieldNames: FormFieldName[]) => form.clearErrors(fieldNames),
          formState: form.formState,
          getValues: () => form.getValues(),
          handleSubmit: handleSubmit,
          reset: form.reset,
          setValue: (name: FormFieldName, value: any) => form.setValue(name, value),
          submit: () => {
            formRef.current?.dispatchEvent(
              new Event('submit', { bubbles: true, cancelable: true }),
            );
          },
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
          data-qa={testID}
          noValidate
          onChange={handleFormChange}
          onSubmit={form.handleSubmit(
            (values, event) => onSubmit(values, event, form),
            onSubmitError,
          )}
          ref={formRef}
        >
          {children}
        </form>
      </FormProvider>
    );
  },
) as <TSchema extends AnyZodObject>(p: { ref?: Ref<FormRef> } & Props<TSchema>) => ReactElement;

(Form as FC).displayName = 'Form';
