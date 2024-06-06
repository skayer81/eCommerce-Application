import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

// import { ClientResponse } from '@commercetools/platform-sdk';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { tokenCache } from '@/api/tokenCache';
import RulesValidation from '@/components/formComponents/rulesValidation';
import { Customer } from '@/features/profilePage/Types';
import { Password, PasswordChange } from '@/types/interfaces';

import { changePassword, passwordFlowAuth } from '../../api/clientService';

function UpdatePassword({ ...props }): JSX.Element {
  const customer: Customer = { ...props };
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const customerId = customer.id as string;
  const customerMail = customer.email as string;
  const version = customer.version as number;
  const queryClient = useQueryClient();
  const [snackBarState, setSnackBar] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Password>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      newPassword: '',
    },
  });

  const submit: SubmitHandler<Password> = (data: Password): void => {
    const newData: PasswordChange = {
      id: customerId,
      version: version,
      currentPassword: data.password,
      newPassword: data.newPassword,
    };

    setLoading(true);
    changePassword(newData)
      .then(() => {
        reset({ password: '', newPassword: '' });
        setEditMode(false);
        setSnackBar(true);
        tokenCache.deleteToken();
      })
      .then(() => {
        passwordFlowAuth({ email: customerMail, password: data.newPassword });
      })
      .then(async () => {
        await queryClient.invalidateQueries({ queryKey: ['me'] });
      })
      .catch((err: HttpErrorType) => {
        console.log('ERROR=', err);
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
  const handleClose = (): void => {
    setSnackBar(false);
  };

  return (
    <Box component="section" sx={{ width: 350, margin: 0 }}>
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
        <form
          onChange={() => setError(false)}
          onSubmit={(event) => void handleSubmit(submit)(event)}
          style={{ width: '100%' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">
              Password
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
              <Typography>Edit mode</Typography>
              <Switch
                checked={editMode}
                color="success"
                onChange={() => {
                  setEditMode(editMode === true ? false : true);
                }}
              />
            </Box>
          </Box>
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Box alignItems="center" display="flex">
                <Typography component="label" htmlFor="password" sx={{ mr: 2 }} variant="body1">
                  Current password:
                </Typography>
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
                  disabled={editMode === false ? true : false}
                  error={!!errors.password}
                  fullWidth
                  helperText={errors.password?.message}
                  onChange={onChange}
                  type={showPassword ? 'text' : 'password'}
                  value={value}
                  variant="standard"
                />
              </Box>
            )}
            rules={RulesValidation.password}
          />
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { value, onChange } }) => (
              <Box alignItems="center" display="flex">
                <Typography component="label" htmlFor="new-password" sx={{ mr: 2 }} variant="body1">
                  New password:
                </Typography>
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
                  disabled={editMode === false ? true : false}
                  error={!!errors.newPassword}
                  fullWidth
                  helperText={errors.newPassword?.message}
                  onChange={onChange}
                  type={showPassword ? 'text' : 'password'}
                  value={value}
                  variant="standard"
                />
              </Box>
            )}
            rules={RulesValidation.password}
          />
          {error && (
            <Alert onClose={() => setError(false)} severity="error">
              Incorrect password
            </Alert>
          )}
          <LoadingButton
            color="success"
            disabled={editMode === false ? true : false}
            loading={loading}
            size="small"
            sx={{ mb: 2, mt: 3 }}
            type="submit"
            variant="contained"
          >
            <span style={{ fontSize: 'inherit' }}>Update data</span>
          </LoadingButton>
        </form>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        key={'top' + 'right'}
        message="Password updated successfully"
        onClose={handleClose}
        open={snackBarState}
      />
    </Box>
  );
}

export default UpdatePassword;
