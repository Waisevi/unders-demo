import { ComponentPropsWithoutRef, FC, ReactNode } from 'react';

type Props = {
  /**
   * Form control error to be displayed
   */
  error?: ReactNode;

  /**
   * Optional label title displayed as a description of the inner contents
   */
  label?: ReactNode;
} & ComponentPropsWithoutRef<'label'>;

/**
 * Displays form control element with optional validation messages
 */
export const Control: FC<Props> = ({ children, error, label, ...props }) => (
  <label className='mb-[1rem] flex flex-col gap-[0.3em]' {...props}>
    {label && <div className={'text-sm'}>{label}</div>}
    {children}
    {Boolean(error) && <div className={'text-xs text-[#FFA726]'}>{error}</div>}
  </label>
);
