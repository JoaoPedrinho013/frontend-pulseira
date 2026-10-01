import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import type { IconComponent } from '../icons';
import styles from './FormField.module.css';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon: IconComponent;
  endAdornment?: ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField(
    { id, label, icon: Icon, endAdornment, className, ...rest },
    ref,
  ) {
    return (
      <div className={classNames(styles.field, className)}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <div className={styles.inputWrapper}>
          <Icon className={styles.icon} />
          <input
            ref={ref}
            id={id}
            className={classNames(
              styles.input,
              endAdornment ? styles.hasEndAdornment : false,
            )}
            {...rest}
          />
          {endAdornment && (
            <div className={styles.endAdornment}>{endAdornment}</div>
          )}
        </div>
      </div>
    );
  },
);
