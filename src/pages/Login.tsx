import type { JSX } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Stack, TextField } from '@mui/material';

import { getAnonymToken, getAuthToken } from '@/API/api';
// import axios from 'axios';

console.log(getAnonymToken());

interface MyForm {
  email: string;
  password: string;
}
export default function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submit: SubmitHandler<MyForm> = async (data: MyForm) => {
    // console.log(data);
    await getAuthToken(data);
  };

  const error: SubmitErrorHandler<MyForm> = (data) => {
    console.log(data);
  };
  console.log('dcgf');
  return (
    <form onSubmit={handleSubmit(submit, error)}>
      <Stack spacing={2} width={400}>
        <TextField
          label="Email"
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required',
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Please enter a valid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required',
            },
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button color="primary" type="submit" variant="contained">
          Login
        </Button>
      </Stack>
    </form>
  );
}
