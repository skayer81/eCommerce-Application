import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { CustomerUpdate } from '@commercetools/platform-sdk';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { LoadingButton } from '@mui/lab';
import { Box, Snackbar, Stack, Switch, TextField, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import ErrorAlert from '@/components/errorAlert/ErrorAlert';
import RulesValidation from '@/components/formComponents/rulesValidation';
import { Customer } from '@/features/profilePage/Types';
import { Email } from '@/types/interfaces';

import { changeData } from '../../api/clientService';

function UpdateEmail({ ...props }): JSX.Element {
  const customer: Customer = { ...props };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  // const [email, setEmail] = useState(customer.email);
  const [snackBarState, setSnackBar] = useState(false);
  const customerId = customer.id as string;
  const version = customer.version;

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Email>({
    mode: 'onChange',
    defaultValues: {
      email: customer.email,
    },
  });

  // const updateEmail = (): Promise<void> => {
  //   const data = {
  //     version: version,
  //     actions: [
  //       {
  //         action: 'changeEmail',
  //         email: email,
  //       },
  //     ],
  //   };
  //   return changeData(data, customerId);
  // };

  const submit: SubmitHandler<Email> = (data: Email): void => {
    const newData: CustomerUpdate = {
      version: version as number,
      actions: [
        {
          action: 'changeEmail',
          email: data.email,
        },
      ],
    };
    setLoading(true);
    changeData(newData, customerId)
      .then(async () => {
        await queryClient.invalidateQueries({ queryKey: ['me'] });
        setEditMode(false);
        setSnackBar(true);
      })
      .catch((error: HttpErrorType) => {
        console.error(error);
        setError(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = (): void => {
    setSnackBar(false);
  };

  return (
    <>
      {error && <ErrorAlert />}
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
          <form onSubmit={(event) => void handleSubmit(submit)(event)} style={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography component="h1" variant="h5">
                Email
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                <Typography>Edit mode</Typography>
                <Switch
                  checked={editMode}
                  color="primary"
                  onChange={() => {
                    setEditMode(editMode === true ? false : true);
                  }}
                />
              </Box>
            </Box>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Box alignItems="center" display="flex">
                  <Typography component="label" htmlFor="last-name" sx={{ mr: 2 }} variant="body1">
                    Email:
                  </Typography>
                  <TextField
                    disabled={editMode === false ? true : false}
                    error={!!errors.email}
                    fullWidth
                    helperText={errors.email?.message}
                    id="email"
                    onChange={onChange}
                    value={value}
                    variant="standard"
                  />
                </Box>
              )}
              rules={RulesValidation.mail}
            />
            <LoadingButton
              color="primary"
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
          message="User data updated successfully"
          onClose={handleClose}
          open={snackBarState}
        />
      </Box>
    </>
  );
}

export default UpdateEmail;
