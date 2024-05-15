import type { JSX } from 'react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Button,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { loginUser, passwordFlowAuth } from '@/api/clientService';
import ButtonToAnotherPage from '@/components/formComponents/ButtonToAnotherPage';
import { useUserStore } from '@/stores/userStore';
import { LoginForm } from '@/types/interfaces';
export default function LoginPage(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigate();
  const { loginUserInStore } = useUserStore();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginForm>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submit: SubmitHandler<LoginForm> = (data: LoginForm): void => {
    loginUser(data)
      .then(({ body }: ClientResponse<CustomerSignInResult>): void => {
        console.log('loginresponse=', body);
        console.log('customerid=', body.customer.id);
        navigation('/');
        loginUserInStore(body.customer.id);
        passwordFlowAuth(data);
      })
      .catch((err: HttpErrorType) => {
        if (err.status === 400) {
          setError(true);
        } else {
          console.error(error);
        }
      });
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

          <form
            onChange={() => setError(false)}
            onSubmit={(event) => void handleSubmit(submit)(event)}
            style={{ width: '100%' }}
          >
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
              {error && (
                <Alert onClose={() => setError(false)} severity="error">
                  User with such email and password was not found
                </Alert>
              )}

              <Button sx={{ py: '10px' }} type="submit" variant="contained">
                Login
              </Button>
            </Stack>
          </form>
          <ButtonToAnotherPage
            addressPage="/register"
            textOnButton="Sign up"
            title="Not registered yet?"
          />
        </Stack>
      </Container>
    </>
  );
}
