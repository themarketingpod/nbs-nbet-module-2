import { FormGroup } from '../../formGroup/formGroup.tsx';
import { InputFieldProps } from '../../../types/inputs.ts';
import styles from './numberField.module.css';

const NumberField = ({
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
        type="number"
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={styles.numberField}
        min={0}
      />
    </FormGroup>
  );
};

export { NumberField };
