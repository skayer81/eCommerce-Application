import { Control, Controller, FieldErrors, RegisterOptions } from 'react-hook-form';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import postalCodesMap from '@/components/formComponents/postalCodes';
import { AddresType } from '@/types/interfaces';

type FormInputProps = {
  control: Control<AddresType>;
  errors: FieldErrors<AddresType>;
  id: string;
  isDisabled?: boolean;
  label: string;
  name: keyof AddresType;
  rules: RegisterOptions;
};

const AdressCountrySelect = ({
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

export default AdressCountrySelect;
