import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { CustomerUpdate } from '@commercetools/platform-sdk';
import { LoadingButton } from '@mui/lab';
import { Box, Snackbar, Stack, Switch, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/de';

import ErrorAlert from '@/components/errorAlert/ErrorAlert';
import RulesValidation from '@/components/formComponents/rulesValidation';
import { Customer } from '@/features/profilePage/Types';
import { ProfileData } from '@/types/interfaces';

import { changeData } from '../../api/clientService';

function UserData({ ...props }): JSX.Element {
  const customer: Customer = { ...props };

  const [loading, setLoading] = useState(false);
  const [snackBarState, setSnackBar] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const customerId = customer.id as string;
  const version = customer.version;

  const queryClient = useQueryClient();

  const { mutate, error, isError } = useMutation<unknown, unknown, CustomerUpdate, unknown>({
    mutationFn: (newData: CustomerUpdate) => changeData(newData, customerId),
    onSuccess: async () => {
      setLoading(false);
      setEditMode(false);
      setSnackBar(true);
      await queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ProfileData>({
    mode: 'onChange',
    defaultValues: {
      name: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: dayjs(customer.dateOfBirth),
    },
  });

  const submit: SubmitHandler<ProfileData> = (data: ProfileData): void => {
    setLoading(true);
    setEditMode;
    const newData: CustomerUpdate = {
      version: version as number,
      actions: [
        {
          action: 'setLastName',
          lastName: data.lastName,
        },
        {
          action: 'setFirstName',
          firstName: data.name,
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth: data.dateOfBirth.format('YYYY-MM-DD'),
        },
      ],
    };

    mutate(newData);
  };

  const handleClose = (): void => {
    setSnackBar(false);
  };

  if (isError) {
    console.error(error);
    return <ErrorAlert />;
  }
  const handleEditModeChange = (): void => {
    setEditMode((prevEditMode) => !prevEditMode);
    reset({
      name: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: dayjs(customer.dateOfBirth),
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
          <form onSubmit={(event) => void handleSubmit(submit)(event)} style={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography component="h1" variant="h5">
                User data
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                <Typography>Edit mode</Typography>
                <Switch checked={editMode} color="primary" onChange={handleEditModeChange} />
              </Box>
            </Box>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Box alignItems="center" display="flex">
                  <Typography component="label" htmlFor="last-name" sx={{ mr: 2 }} variant="body1">
                    FirstName:
                  </Typography>
                  <TextField
                    disabled={editMode === false ? true : false}
                    error={!!errors.name}
                    fullWidth
                    helperText={errors.name?.message}
                    id="name"
                    onChange={onChange}
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#46A358',
                      },
                    }}
                    value={value}
                    variant="standard"
                  />
                </Box>
              )}
              rules={RulesValidation.onlyLetters}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field: { value, onChange } }) => (
                <Box alignItems="center" display="flex">
                  <Typography component="label" htmlFor="last-name" sx={{ mr: 2 }} variant="body1">
                    LastName:
                  </Typography>
                  <TextField
                    disabled={editMode === false ? true : false}
                    error={!!errors.lastName}
                    fullWidth
                    helperText={errors.lastName?.message}
                    id="last-name"
                    onChange={onChange}
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#46A358',
                      },
                    }}
                    value={value}
                    variant="standard"
                  />
                </Box>
              )}
              rules={RulesValidation.onlyLetters}
            />
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { value, onChange } }) => (
                <Box alignItems="center" display="flex">
                  <Typography component="label" htmlFor="last-name" sx={{ mr: 2 }} variant="body1">
                    Date of birth:
                  </Typography>
                  <DatePicker
                    disabled={editMode === false ? true : false}
                    onChange={onChange}
                    slotProps={{
                      textField: {
                        size: 'small',
                        error: !!errors['dateOfBirth']?.message,
                        helperText: errors['dateOfBirth']?.message,
                        variant: 'standard',
                      },
                    }}
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#46A358',
                      },
                    }}
                    value={value}
                  />
                </Box>
              )}
              rules={RulesValidation.dateOfbirth}
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
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        key={'top' + 'right'}
        message="User data updated successfully"
        onClose={handleClose}
        open={snackBarState}
      />
    </LocalizationProvider>
  );
}

export default UserData;
