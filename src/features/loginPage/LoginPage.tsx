import type { JSX } from 'react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link as LinkRouter } from 'react-router-dom';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { LoginForm } from '@/types/interfaces';

export default function LoginPage(): JSX.Element {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const submit: SubmitHandler<LoginForm> = (data: LoginForm): void => {
    console.log(data);
  };

  return (
    <>
      <CssBaseline />
      <Container
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          py: 5,
          px: 2,
        }}
      >
        <Stack
          maxWidth={350}
          spacing={2}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <form onSubmit={(event) => void handleSubmit(submit)(event)} style={{ width: '100%' }}>
            <Stack spacing={3} sx={{ width: '100%' }}>
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

              <Button sx={{ py: '10px' }} type="submit" variant="contained">
                Login
              </Button>
            </Stack>
          </form>
          <Stack direction="row" spacing={1} sx={{ typography: 'body1' }}>
            <Typography>Not registered yet?</Typography>
            <Link component={LinkRouter} to="/register">
              Sign up
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
