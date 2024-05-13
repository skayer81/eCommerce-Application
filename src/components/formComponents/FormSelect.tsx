import { Control, Controller, FieldErrors, RegisterOptions } from 'react-hook-form';

import { InputLabel, MenuItem, Select } from '@mui/material';

import { RegistrationForm } from '@/types/interfaces';

type FormInputProps = {
  control: Control<RegistrationForm>;
  errors: FieldErrors<RegistrationForm>;
  id: string;
  label: string;
  name: keyof RegistrationForm;
  rules: RegisterOptions;
};

const FormSelect = ({ control, errors, label, name, rules, id }: FormInputProps): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <InputLabel id={id}>{label}</InputLabel>
          <Select
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
            <MenuItem value={'Country1'}>Country1</MenuItem>
            <MenuItem value={'Country2'}>Country2</MenuItem>
            <MenuItem value={'Country3'}>Country3</MenuItem>
          </Select>
        </>
      )}
      rules={rules}
    />
  );
};

export default FormSelect;
