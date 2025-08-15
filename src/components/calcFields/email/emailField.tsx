import { FormGroup } from '../../formGroup/formGroup.tsx';
import { InputFieldProps } from '../../../types/inputs.ts';
import styles from './emailField.module.css';

const EmailField = ({
  value,
  label,
  placeholder,
  onChange,
  name,
}: InputFieldProps) => {
  return (
    <FormGroup>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="email"
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={styles.emailField}
      />
    </FormGroup>
  );
};

export { EmailField };
