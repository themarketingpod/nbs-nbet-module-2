import { InputFieldProps } from '../../../types/inputs.ts';
import { FormGroup } from '../../formGroup/formGroup.tsx';
import styles from './selectField.module.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends InputFieldProps {
  options?: SelectOption[];
  value?: string;
}

const SelectField = ({
  value,
  options,
  onChange,
  placeholder,
  label,
  name,
}: SelectFieldProps) => {
  return (
    <FormGroup>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        name={name}
        id={name}
        className={styles.nbsSelect}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormGroup>
  );
};

export { SelectField };
