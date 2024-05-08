import { Control, Controller, FieldErrors, RegisterOptions } from 'react-hook-form';

import TextField from '@mui/material/TextField';

import { RegistrationForm } from '@/types/interfaces';

type FormInputProps = {
  control: Control<RegistrationForm>;
  errors: FieldErrors<RegistrationForm>;
  label: string;
  name: keyof RegistrationForm;
  rules: RegisterOptions;
  type: string;
};

export const FormInputText = ({
  control,
  errors,
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
          error={!!errors.surname?.message}
          fullWidth
          helperText={errors?.surname?.message}
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
