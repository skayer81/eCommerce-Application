import { useEffect, useState } from 'react';
import { Controller, RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';

import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import { LoadingButton } from '@mui/lab';
import { FormControlLabel } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/de';

import { createCustomer, loginUser, passwordFlowAuth } from '@/api/clientService';
import ButtonToAnotherPage from '@/components/formComponents/ButtonToAnotherPage';
import { FormInputText } from '@/components/formComponents/FormInputText';
import FormSelect from '@/components/formComponents/FormSelect';
import RulesValidation from '@/components/formComponents/rulesValidation';
import { RegistrationForm } from '@/types/interfaces';

import registrationFormDataAdapter from './RegistrationFormDataAdapter';
import { defaultValues } from './defaultValues';

type Props = {
  resultOfSubmit: (result: { hasError: boolean; message: string }, id?: string) => void;
};

export default function FormOfRegistration({ resultOfSubmit }: Props): JSX.Element {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<RegistrationForm>({ mode: 'onChange', defaultValues });
  const [loading, setLoading] = useState(false);

  const checkboxUseAsBilling = watch('useShippingAsBilling');
  const shippingCountry = watch('shippingCountry');
  const billingCountry = watch('billingCountry');
  const shippingAdress = watch('shippingAdress');
  const shippingIndex = watch('shippingIndex');
  const shippingCity = watch('shippingCity');

  const [shippingIndexRules, setShippingIndexRules] = useState(RulesValidation.postCodeRU);
  const [isBillingAdressDisabled, SetIsBillingAdressDisabled] = useState(false);

  useEffect(() => {
    const newRulesValidation: RegisterOptions = RulesValidation[`postCode${shippingCountry}`];
    setShippingIndexRules(newRulesValidation);
  }, [shippingCountry]);

  const [billingIndexRules, setBillingIndexRules] = useState(RulesValidation.postCodeRU);

  useEffect(() => {
    const newRulesValidation: RegisterOptions = RulesValidation[`postCode${billingCountry}`];
    setBillingIndexRules(newRulesValidation);
  }, [billingCountry]);

  useEffect(() => {
    if (checkboxUseAsBilling) {
      setValue('billingCountry', shippingCountry, { shouldValidate: true });
      setValue('billingAdress', shippingAdress, { shouldValidate: true });
      setValue('billingIndex', shippingIndex, { shouldValidate: true });
      setValue('billingCity', shippingCity, { shouldValidate: true });
    }
    SetIsBillingAdressDisabled(checkboxUseAsBilling);
  }, [
    checkboxUseAsBilling,
    setValue,
    shippingAdress,
    shippingIndex,
    shippingCity,
    shippingCountry,
  ]);

  const onSubmit: SubmitHandler<RegistrationForm> = (data: RegistrationForm): void => {
    setLoading(true);
    createCustomer(registrationFormDataAdapter(data))
      .then(() => {
        return loginUser({ email: data.email, password: data.password });
      })
      .then(({ body }: ClientResponse<CustomerSignInResult>) => {
        resultOfSubmit(
          { hasError: false, message: 'You have successfully registered' },
          body.customer.id,
        );
        passwordFlowAuth({ email: data.email, password: data.password });
        console.log(body);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        let message = String(error.message);
        if (!message) {
          message = '';
        }
        resultOfSubmit({ hasError: true, message: message });
        console.log(error);
      });
  };

  return (
    <LocalizationProvider adapterLocale="de" dateAdapter={AdapterDayjs}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 8,
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main', m: 1 }}>{/* <LockOutlinedIcon /> */}</Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <ButtonToAnotherPage
            addressPage="/login"
            textOnButton="Log in"
            title="Already have an account?"
          />
          <Box
            component="form"
            noValidate
            onSubmit={(event) => void handleSubmit(onSubmit)(event)}
            sx={{ mt: 1 }}
          >
            <FormInputText
              control={control}
              errors={errors}
              label="Login"
              name="login"
              rules={RulesValidation.onlyLetters}
              type="text"
            />
            <FormInputText
              control={control}
              errors={errors}
              label="Password"
              name="password"
              rules={RulesValidation.password}
              type="password"
            />
            <FormInputText
              control={control}
              errors={errors}
              label="Name"
              name="name"
              rules={RulesValidation.onlyLetters}
              type="text"
            />
            <FormInputText
              control={control}
              errors={errors}
              label="Surname"
              name="surname"
              rules={RulesValidation.onlyLetters}
              type="text"
            />
            <FormInputText
              control={control}
              errors={errors}
              label="Email"
              name="email"
              rules={RulesValidation.mail}
              type="email"
            />
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  label="Date Of Birth"
                  onChange={onChange}
                  slotProps={{
                    textField: {
                      size: 'small',
                      fullWidth: true,
                      error: !!errors['dateOfBirth']?.message,
                      helperText: errors['dateOfBirth']?.message,
                    },
                  }}
                  value={value}
                />
              )}
              rules={RulesValidation.dateOfbirth}
            />
            <Box component="fieldset" sx={{ border: '1px solid black' }}>
              <legend>Shipping address</legend>
              <FormSelect
                control={control}
                errors={errors}
                id="shippingCountry"
                label="Country"
                name="shippingCountry"
                rules={RulesValidation.required}
              />
              <FormInputText
                control={control}
                errors={errors}
                label="City"
                name="shippingCity"
                rules={RulesValidation.onlyLetters}
                type="text"
              />
              <FormInputText
                control={control}
                errors={errors}
                label="Street"
                name="shippingAdress"
                rules={RulesValidation.lettersNumbersAndSpecialCharacter}
                type="text"
              />
              <FormInputText
                control={control}
                errors={errors}
                label="Index"
                name="shippingIndex"
                rules={shippingIndexRules}
                type="text"
              />
              <Controller
                control={control}
                name="useByDefaultShipping"
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} color="primary" />}
                    label="Use as default address"
                  />
                )}
              />
              <Controller
                control={control}
                name="useShippingAsBilling"
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} color="primary" />} // onChange={onChange}
                    label="Use as billing address"
                  />
                )}
              />
            </Box>
            <Box component="fieldset" sx={{ border: '1px solid black' }}>
              <legend>Billing address</legend>
              <FormSelect
                control={control}
                errors={errors}
                id="billingCountry"
                isDisabled={isBillingAdressDisabled}
                label="Country"
                name="billingCountry"
                rules={RulesValidation.required}
              />
              <FormInputText
                control={control}
                errors={errors}
                isDisabled={isBillingAdressDisabled}
                label="City"
                name="billingCity"
                rules={RulesValidation.onlyLetters}
                type="text"
              />
              <FormInputText
                control={control}
                errors={errors}
                isDisabled={isBillingAdressDisabled}
                label="Street"
                name="billingAdress"
                rules={RulesValidation.lettersNumbersAndSpecialCharacter}
                type="text"
              />
              <FormInputText
                control={control}
                errors={errors}
                isDisabled={isBillingAdressDisabled}
                label="Index"
                name="billingIndex"
                rules={billingIndexRules}
                type="text"
              />
              <Controller
                control={control}
                name="useByDefaultBilling"
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} color="primary" />}
                    label="Use as default address"
                  />
                )}
              />
            </Box>

            <LoadingButton
              fullWidth
              loading={loading}
              sx={{ mb: 2, mt: 3 }}
              type="submit"
              variant="contained"
            >
              <span style={{ fontSize: 'inherit' }}>Register</span>
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}
