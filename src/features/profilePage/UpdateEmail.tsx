import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { LoadingButton } from '@mui/lab';
import { Box, Stack, Switch, TextField, Typography } from '@mui/material';

import RulesValidation from '@/components/formComponents/rulesValidation';
import { Customer } from '@/features/profilePage/Types';
import { Email } from '@/types/interfaces';

import { changeData } from '../../api/clientService';

function UpdateEmail({ ...props }): JSX.Element {
  const customer: Customer = { ...props };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState(customer.email);
  const customerId = customer.id as string;
  const version = customer.version;

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Email>({
    mode: 'onChange',
    defaultValues: {
      email: email,
    },
  });

  const updateEmail = (): Promise<void> => {
    const data = {
      version: version,
      actions: [
        {
          action: 'changeEmail',
          email: email,
        },
      ],
    };
    return changeData(data, customerId);
  };

  const submit: SubmitHandler<Email> = (): void => {
    setLoading(true);
    updateEmail()
      .then(console.log)
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
              Email
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
              <Typography>Edit mode</Typography>
              <Switch
                color="success"
                onChange={() => {
                  setEditMode(editMode === true ? false : true);
                }}
              />
            </Box>
          </Box>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Box alignItems="center" display="flex">
                <Typography component="label" htmlFor="last-name" sx={{ mr: 2 }} variant="body1">
                  Email:
                </Typography>
                <TextField
                  defaultValue={email}
                  disabled={editMode === false ? true : false}
                  error={!!errors.email}
                  fullWidth
                  helperText={errors.email?.message}
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    onChange(e);
                  }}
                  variant="standard"
                />
              </Box>
            )}
            rules={RulesValidation.mail}
          />
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
    </Box>
  );
}

export default UpdateEmail;
