import { FC, ComponentPropsWithoutRef, ReactNode } from 'react';
import * as styles from './control.css';

type Props = ComponentPropsWithoutRef<'label'> & {
  /**
   * Optional label title displayed as a description of the inner contents
   */
  label?: ReactNode;

  /**
   * Form control error to be displayed
   */
  error?: ReactNode;
};

/**
 * Displays form control element with optional validation messages
 */
export const Control: FC<Props> = ({ label, error, children, ...props }) => (
  <label className={styles.root} {...props}>
    {label && <div className={styles.label}>{label}</div>}
    {children}
    {Boolean(error) && <div className={styles.error}>{error}</div>}
  </label>
);
