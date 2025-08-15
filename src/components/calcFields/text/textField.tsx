import { FormGroup } from '../../formGroup/formGroup.tsx';
import { InputFieldProps } from '../../../types/inputs.ts';
import styles from './textField.module.css';

const TextField = ({
  value,
  label,
  placeholder,
  onChange,
  name,
  required = false,
  error,
}: InputFieldProps) => {
  return (
    <FormGroup>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={styles.textField}
      />
    </FormGroup>
  );
};

export { TextField };
