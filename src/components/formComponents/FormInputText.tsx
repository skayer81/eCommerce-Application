import { Control, Controller, FieldErrors, RegisterOptions } from 'react-hook-form';

import TextField from '@mui/material/TextField';

import { RegistrationForm } from '@/types/interfaces';

type FormInputProps = {
  control: Control<RegistrationForm>;
  errors: FieldErrors<RegistrationForm>;
  isDisabled?: boolean;
  label: string;
  name: keyof RegistrationForm;
  rules: RegisterOptions;
  type: string;
};

export const FormInputText = ({
  control,
  errors,
  isDisabled,
  label,
  name,
  rules,
  type,
}: FormInputProps): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextField
          disabled={!!isDisabled}
          error={!!errors[name]?.message}
          fullWidth
          helperText={errors[name]?.message}
          label={label}
          onChange={onChange}
          size="small"
          sx={{ mb: 1 }}
          type={type}
          value={value}
          variant="outlined"
        />
      )}
      rules={rules}
    />
  );
};
