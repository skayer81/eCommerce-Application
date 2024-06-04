import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { Box, Container, Stack, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import RulesValidation from '@/components/formComponents/rulesValidation';
import { PROJECT_KEY } from '@/config/clientConfig';
import { useCustomerStore } from '@/features/profilePage/Types';
import { profileData } from '@/types/interfaces';
import getCookie from '@/utils/helpers/cookies';

import { changeData, existingFlowAuth, getUserInfo } from '../../api/clientService';

function UserData(): JSX.Element {
  const [error, setError] = useState(false);
  const [editMode] = useState(false);
  const [firstName, setFirstName] = useState(useCustomerStore().customer.firstName);
  const [lastName, setLastName] = useState(useCustomerStore().customer.lastName);
  const [dateOfBirthD, setDateOfBirth] = useState(dayjs(useCustomerStore().customer.dateOfBirth));
  const { saveUserInStore } = useCustomerStore();
  const customerId = useCustomerStore().customer.id as string;
  const version = useCustomerStore().customer.version;

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<profileData>({
    mode: 'onChange',
    defaultValues: {
      name: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirthD,
    },
  });

  const getUser = async (): Promise<void> => {
    const token = getCookie(PROJECT_KEY);
    if (token !== null) {
      const accessToken = 'Bearer ' + token;
      const root = existingFlowAuth(accessToken);
      await getUserInfo(root, saveUserInStore);
    }
  };

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

  const submit: SubmitHandler<profileData> = (): void => {
    updateUserData()
      .then(() => getUser())
      .catch((err: HttpErrorType) => {
        if (err.status === 400) {
          setError(true);
        } else {
          console.error(error);
        }
      })
      .finally(() => {});
  };

  return (
    <LocalizationProvider adapterLocale="de" dateAdapter={AdapterDayjs}>
      <Container component="section">
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
            <Typography component="h1" sx={{ mb: 2 }} variant="h5">
              Profile
            </Typography>
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
                <Box alignItems="center" display="flex" sx={{ mb: 4 }}>
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
          </form>
        </Stack>
      </Container>
    </LocalizationProvider>
  );
}

export default UserData;
