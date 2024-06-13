import type { JSX } from 'react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { getProject, loginUser, passwordFlowAuth } from '@/api/clientService';
import ButtonToAnotherPage from '@/components/formComponents/ButtonToAnotherPage';
import RulesValidation from '@/components/formComponents/rulesValidation';
import { useBasketStore } from '@/stores/basketStore';
import { useUserStore } from '@/stores/userStore';
import { LoginForm } from '@/types/interfaces';

import { useCustomerStore } from '../profilePage/Types';
export default function LoginPage(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const { loginUserInStore } = useUserStore();
  const { saveUserInStore } = useCustomerStore();
  const { addBasketIDInStore, updateCurrentVersion } = useBasketStore();
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
    setLoading(true);
    loginUser(data)
      .then(({ body }: ClientResponse<CustomerSignInResult>) => {
        if (body.cart) {
          addBasketIDInStore(body.cart.id);
          updateCurrentVersion(body.cart.version);
        }
        navigation('/');
        loginUserInStore(body.customer.id);
        const root = passwordFlowAuth(data);
        saveUserInStore(body.customer);
        return getProject(root);
      })
      .catch((err: HttpErrorType) => {
        if (err.status === 400) {
          setError(true);
        } else {
          console.error(error);
        }
      })
      .finally(() => {
        setLoading(false);
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
                rules={RulesValidation.mail}
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
                rules={RulesValidation.password}
              />
              {error && (
                <Alert onClose={() => setError(false)} severity="error">
                  User with such email and password was not found
                </Alert>
              )}

              <LoadingButton
                loading={loading}
                sx={{ py: '10px' }}
                type="submit"
                variant="contained"
              >
                <span style={{ fontSize: 'inherit' }}>Login</span>
              </LoadingButton>
            </Stack>
          </form>
          <ButtonToAnotherPage
            addressPage="/registration"
            textOnButton="Sign up"
            title="Not registered yet?"
          />
        </Stack>
      </Container>
    </>
  );
}
