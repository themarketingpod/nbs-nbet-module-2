import { ReactNode } from 'react';
import styles from './formGroup.module.css';

interface FormGroupProps {
  children: ReactNode;
  className?: string;
}

const FormGroup = ({ children, className }: FormGroupProps) => {
  return <div className={`${styles.formGroup} ${className}`}>{children}</div>;
};

export { FormGroup };
