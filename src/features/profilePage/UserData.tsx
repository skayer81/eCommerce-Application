import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { LoadingButton } from '@mui/lab';
import { Box, Stack, Switch, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import RulesValidation from '@/components/formComponents/rulesValidation';
import { Customer } from '@/features/profilePage/Types';
import { ProfileData } from '@/types/interfaces';

import { changeData } from '../../api/clientService';

function UserData({ ...props }): JSX.Element {
  const customer: Customer = { ...props };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);
  const [dateOfBirthD, setDateOfBirth] = useState(dayjs(customer.dateOfBirth));
  const customerId = customer.id as string;
  const version = customer.version;

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ProfileData>({
    mode: 'onChange',
    defaultValues: {
      name: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirthD,
    },
  });

  const updateUserData = (): Promise<void> => {
    const data = {
      version: version,
      actions: [
        {
          action: 'setLastName',
          lastName: lastName,
        },
        {
          action: 'setFirstName',
          firstName: firstName,
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth: dateOfBirthD.format('YYYY-MM-DD'),
        },
      ],
    };
    return changeData(data, customerId);
  };

  const submit: SubmitHandler<ProfileData> = (): void => {
    setLoading(true);
    updateUserData()
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
    <LocalizationProvider adapterLocale="de" dateAdapter={AdapterDayjs}>
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
                User data
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
              name="name"
              render={({ field: { onChange } }) => (
                <Box alignItems="center" display="flex">
                  <Typography component="label" htmlFor="last-name" sx={{ mr: 2 }} variant="body1">
                    FirstName:
                  </Typography>
                  <TextField
                    defaultValue={firstName}
                    disabled={editMode === false ? true : false}
                    error={!!errors.name}
                    fullWidth
                    helperText={errors.name?.message}
                    id="name"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      onChange(e);
                    }}
                    variant="standard"
                  />
                </Box>
              )}
              rules={RulesValidation.onlyLetters}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange } }) => (
                <Box alignItems="center" display="flex">
                  <Typography component="label" htmlFor="last-name" sx={{ mr: 2 }} variant="body1">
                    LastName:
                  </Typography>
                  <TextField
                    defaultValue={lastName}
                    disabled={editMode === false ? true : false}
                    error={!!errors.lastName}
                    fullWidth
                    helperText={errors.lastName?.message}
                    id="last-name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                      setLastName(e.target.value);
                      onChange(e);
                    }}
                    variant="standard"
                  />
                </Box>
              )}
              rules={RulesValidation.onlyLetters}
            />
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange } }) => (
                <Box alignItems="center" display="flex">
                  <Typography component="label" htmlFor="last-name" sx={{ mr: 2 }} variant="body1">
                    Date of birth:
                  </Typography>
                  <DatePicker
                    defaultValue={dateOfBirthD}
                    disabled={editMode === false ? true : false}
                    onChange={(e) => {
                      setDateOfBirth(dayjs(e));
                      onChange(e);
                    }}
                    slotProps={{
                      textField: {
                        size: 'small',
                        error: !!errors['dateOfBirth']?.message,
                        helperText: errors['dateOfBirth']?.message,
                        variant: 'standard',
                      },
                    }}
                  />
                </Box>
              )}
              rules={RulesValidation.dateOfbirth}
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
    </LocalizationProvider>
  );
}

export default UserData;
