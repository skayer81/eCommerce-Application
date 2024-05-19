import { Control, Controller, FieldErrors, RegisterOptions } from 'react-hook-form';

import { InputLabel, MenuItem, Select } from '@mui/material';

import { RegistrationForm } from '@/types/interfaces';

type FormInputProps = {
  control: Control<RegistrationForm>;
  errors: FieldErrors<RegistrationForm>;
  id: string;
  isDisabled?: boolean;
  label: string;
  name: keyof RegistrationForm;
  rules: RegisterOptions;
};

const FormSelect = ({
  control,
  errors,
  isDisabled,
  label,
  name,
  rules,
  id,
}: FormInputProps): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            disabled={isDisabled != undefined ? isDisabled : false}
            error={!!errors[name]?.message}
            fullWidth
            id={id}
            label={label}
            labelId={id}
            onChange={onChange}
            size="small"
            sx={{ mb: 1 }}
            value={value}
            variant="outlined"
          >
            <MenuItem value={'RU'}>Russia</MenuItem>
            <MenuItem value={'CN'}>China</MenuItem>
            <MenuItem value={'ZA'}>South Africa</MenuItem>
          </Select>
        </>
      )}
      rules={rules}
    />
  );
};

export default FormSelect;
