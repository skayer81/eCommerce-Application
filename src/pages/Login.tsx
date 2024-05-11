import type { JSX } from 'react';
import { useState } from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';

import { getAnonymToken /* getAuthToken  */ } from '@/API/api';
// import { authUser } from '@/API/sdktest';
// import axios from 'axios';

// console.log(getAnonymToken());

interface MyForm {
  email: string;
  password: string;
}
export default function Login(): JSX.Element {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<MyForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const submit: SubmitHandler<MyForm> = async (data: MyForm) => {
    console.log(data);
    // await authUser(data);
    await getAnonymToken();
  };

  const error: SubmitErrorHandler<MyForm> = (data) => {
    console.log(data);
  };
  console.log('dcgf');

  return (
    <form onSubmit={handleSubmit(submit, error)}>
      <Stack spacing={2} width={400}>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <TextField
              error={!!errors.email}
              fullWidth
              helperText={errors.email?.message}
              label="Email"
              onChange={onChange}
              value={value}
              variant="outlined"
            />
          )}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Please enter a valid email address',
            },
          }}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors.password}
              fullWidth
              helperText={errors.password?.message}
              label="Password"
              onChange={onChange}
              type={showPassword ? 'text' : 'password'}
              value={value}
              variant="outlined"
            />
          )}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])\S+$/,
              message:
                'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
            },
          }}
        />

        <FormControlLabel
          control={
            <Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
          }
          label="Show Password"
        />

        <Button color="primary" type="submit" variant="contained">
          Login
        </Button>
      </Stack>
    </form>
  );
}
