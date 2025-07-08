import { forwardRef, ComponentPropsWithoutRef, ReactNode } from 'react';
import { root, input as inputStyle } from './text-input.css';

type Props = ComponentPropsWithoutRef<'input'> & {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ startAdornment, endAdornment, ...props }, ref) => (
    <div className={root}>
      {startAdornment}
      <input ref={ref} className={inputStyle} {...props} />
      {endAdornment}
    </div>
  ),
);

TextInput.displayName = 'TextInput';
