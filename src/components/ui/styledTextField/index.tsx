import {
  TextField,
  InputProps,
  FilledInputProps,
  OutlinedInputProps,
} from '@mui/material';
import { ChangeEventHandler, FocusEventHandler } from 'react';

interface IAdornment {
  adornment:
    | Partial<InputProps>
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | undefined;
}

interface IStyledTextField {
  name?: string;
  id?: string;
  label?: string;
  type?: string;
  value?: any;
  adornment?: IAdornment;
  adornmentType?: string;
  helperText?: string;
  error?: boolean;
  onChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onBlur?:
    | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  InputProps: any;
}

const StyledTextField = (props: IStyledTextField) => {
  const {
    name,
    id,
    label,
    value,
    type,
    adornment,
    helperText,
    error,
    onChange,
    onBlur,
    ...rest
  } = props;
  return (
    <TextField
      name={name}
      id={id}
      label={label}
      value={value}
      type={type}
      helperText={helperText}
      error={error}
      onChange={onChange}
      onBlur={onBlur}
      sx={{
        borderRadius: '14px',
        ':root': {
          borderRadius: '12px',
        },
      }}
      {...rest}
    />
  );
};

export default StyledTextField;
