// import { RegisterOptions } from "react-hook-form";
import { Control, Controller, FieldErrors, RegisterOptions } from 'react-hook-form';

import { InputLabel, MenuItem, Select } from '@mui/material';
//import TextField from '@mui/material/TextField';

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
      // render={({ field: { onChange, value } }) => (
      //   <TextField
      //     error={!!errors[name]?.message}
      //     fullWidth
      //     helperText={errors[name]?.message}
      //     label={label}
      //     onChange={onChange}
      //     size="small"
      //     sx={{ mb: 1 }}
      //     type={type}
      //     value={value}
      //     variant="outlined"
      //   />
      // )}
      render={({ field: { onChange, value } }) => (
        <>
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            error={!!errors[name]?.message}
            fullWidth
            // helperText={errors[name]?.message}
            id={id}
            label={label}
            labelId={id}
            onChange={onChange}
            size="small"
            sx={{ mb: 1 }}
            value={value}
            variant="outlined"

            //rules={rules}

            //value={age}

            //onChange={handleChange}
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

// function FormSelect({id ,  rules}: FormSelectProps): JSX.Element{
//   return (
//     <>
//     <InputLabel id={id} >Country</InputLabel>
// <Select
// fullWidth
//   id={id}
//   label="Country"
//   labelId={id}
//   size="small"
//   sx={{ mb: 1 }}

//   //rules={rules}

//   //value={age}

//   //onChange={handleChange}
// >
//   <MenuItem value={'Country1'}>Country1</MenuItem>
//   <MenuItem value={'Country2'}>Country2</MenuItem>
//   <MenuItem value={'Country3'}>Country3</MenuItem>
// </Select>
//     </>
//   )
// }
export default FormSelect;
