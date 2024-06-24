import { Control, Controller, FieldErrors, RegisterOptions } from 'react-hook-form';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { RegistrationForm } from '@/types/interfaces';

import postalCodesMap from './postalCodes';

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
        <FormControl fullWidth size="small">
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            disabled={!!isDisabled}
            error={!!errors[name]?.message}
            fullWidth
            id={id}
            label={label}
            labelId={id}
            onChange={onChange}
            sx={{ mb: 1 }}
            value={value}
          >
            {postalCodesMap.map((elem, index) => {
              return (
                <MenuItem key={index} value={elem.code}>
                  {elem.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
      rules={rules}
    />
  );
};

export default FormSelect;
