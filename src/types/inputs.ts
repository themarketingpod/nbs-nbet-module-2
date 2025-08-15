export interface InputFieldProps {
  onChange: (value: string) => void;
  placeholder: string;
  label?: string;
  name: string;
  value?: string;
  required?: boolean;
  error?: string;
}
